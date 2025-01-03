import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LoggerService} from "../../logger";
import {User} from "./user.entity";
import {In, LessThanOrEqual, MoreThan, Repository} from "typeorm";
import {CreateUserDto, UpdateUserDto, ValidateUserDto} from "./user.dto";
import {compare, hashSync} from "bcrypt";
import {ESortType, PaginationDto, ROLE} from "../../types";
import {Messages} from "../../config";
import {CacheService} from "../cache";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async comparePassword(passwordOld: string, userPassword: string) {
    return await compare(passwordOld, userPassword);
  }

  async updateUser(updateUser: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({where: {id: updateUser.id}});

      if (!user) new HttpException("USER_UPDATE", HttpStatus.NOT_FOUND);


      const updatedData = Object.fromEntries(
        Object.entries(updateUser).filter(([key, value]) => value !== undefined && value !== null)
      );

      await this.userRepository.update(updateUser.id, updatedData);

      await this.cache.delByPattern("users:*");
      return await this.userRepository.findOne({where: {id: updateUser.id}});

    } catch (error) {
      this.logger.error(error);
      throw new HttpException("USER_UPDATE", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUsers(createUser: CreateUserDto) {
    try {

      const passwordHash = hashSync(createUser.password, 10);

      const user = this.userRepository.create({...createUser, password: passwordHash});

      if (!user) return null;

      await this.userRepository.save(user);

      await this.cache.delByPattern("users:*");

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("USER_CREATE", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUser(email: string, username: string) {
    return await this.userRepository.findOne({where: [{email}, {username}]});
  }

  async findByGoogleId(googleId: string) {
    return await this.userRepository.findOne({where: {googleId: googleId}});
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async findByEmailAndCode(email: string, code: string) {
    return await this.userRepository.findOne({where: {email, code}});
  }

  async findUserRemove() {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const users = await this.userRepository.find({
      where: {
        code: MoreThan(""),
        emailVerified: false,
        createdAt: LessThanOrEqual(fiveMinutesAgo),
        role: ROLE.USER
      }
    });
    return await this.userRepository.remove(users);
  }

  async findByID(id: number) {
    return await this.userRepository.findOne({where: {id}});
  }

  async findByCode(code: string) {
    return await this.userRepository.findOne({where: {code}});
  }


  async get(id: number) {
    const user = await this.findByID(id);
    if (!user) throw new HttpException(Messages.auth.notFound, HttpStatus.NOT_FOUND);

    delete user.password;
    delete user.refreshToken;

    return user;
  }

  async update(
    id: number,
    updateUser: UpdateUserDto
  ) {
    const user = await this.findByID(id);
    if (!user) throw new HttpException(Messages.auth.notFound, HttpStatus.NOT_FOUND);

    const updatedData = Object.fromEntries(
      Object.entries(updateUser).filter(([key, value]) => value !== undefined && value !== null)
    );

    await this.userRepository.update(id, updatedData);

    await this.cache.delByPattern("users:*");
    return {
      user: await this.findByID(id),
      message: Messages.auth.updateSuccess
    };
  }

  async block(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new HttpException("No users selected to block", HttpStatus.BAD_REQUEST);
    }

    const users = await this.userRepository.find({where: {id: In(ids)}});
    if (users.length !== ids.length) {
      throw new HttpException("Some selected users were not found", HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(ids, {isBlocked: users.length === 1 ? !users[0].isBlocked : true});
    await this.cache.delByPattern("users:*");

    return {
      message: `Successfully blocked ${ids.length} users`,
      blockedUsers: users.map(u => ({id: u.id, username: u.username}))
    };
  }

  async list(
    paginationDto: PaginationDto
  ) {
    try {
      const {page = 1, limit = 10, sortBy = "createdAt", sortType = ESortType.DESC, search} = paginationDto;

      const cacheKey = `users:${page}:${limit}:${sortBy}:${sortType}:${search}`;

      return await this.cache.auto(cacheKey, true, 30, async () => {
        const skip = (page - 1) * limit;

        const query = this.userRepository.createQueryBuilder("user")
          .where("user.role != :admin", {admin: ROLE.ADMIN})
          .select(["user.id", "user.username", "user.email",
            "user.isBlocked", "user.googleId", "user.role",
            "user.totalSolved", "user.phone", "user.fullName",
            "user.createdAt", "user.updatedAt", "user.isBlocked"
          ]);

        if (search) {
          query.andWhere("user.username LIKE :search OR user.email LIKE :search OR user.fullName LIKE :search OR user.phone LIKE :search", {search: `%${search}%`});
        }

        if (sortBy && !this.userRepository.metadata.columns.find(column => column.propertyName === sortBy)) {
          throw new HttpException("Invalid sortBy parameter", HttpStatus.BAD_REQUEST);
        }

        const validSortType = sortType?.toUpperCase();
        if (validSortType && ![ESortType.ASC, ESortType.DESC].includes(validSortType as ESortType)) {
          throw new HttpException("Invalid sortType. Must be \"ASC\" or \"DESC\".", HttpStatus.BAD_REQUEST);
        }

        if (sortBy) {
          query.orderBy(`user.${sortBy}`, validSortType as ESortType);
        }

        query.skip(skip).take(limit);
        const [users, total] = await query.getManyAndCount();

        this.logger.log(`Fetched ${cacheKey} users (Total: ${total})`);

        const totalPages = Math.ceil(total / limit);

        return {
          paginate: users,
          page: page,
          totalPages,
          hasNext: page < totalPages,
          totalItems: total
        };
      });
    } catch (error) {
      this.logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException("USER_LIST", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(loginDto: ValidateUserDto) {
    try {
      const user = await this.findByUser(loginDto.account, loginDto.account);

      if (!user) return null;

      if (!user.password || user.password === "" || user.isBlocked) new HttpException("USER_LOGIN_SSO", HttpStatus.FORBIDDEN);

      const isValidPassword = await compare(loginDto.password, user.password);

      if (isValidPassword) {
        delete user.password;
        delete user.refreshToken;
        return user;
      }
      return null;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("USER_LOGIN_SSO", HttpStatus.FORBIDDEN);
    }
  }

}
