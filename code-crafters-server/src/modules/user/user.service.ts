import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../logger";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { createUser, UpdateUser, validateUser } from "./user.dto";
import { compare, hashSync } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: LoggerService
  ) {
  }

  async comparePassword(passwordOld: string, userPassword: string) {
    return await compare(passwordOld, userPassword);
  }

  async updateUser(updateUser: UpdateUser) {
    try {
      const user = await this.userRepository.findOne({ where: { id: updateUser.id } });

      if (!user) new HttpException("USER_UPDATE", HttpStatus.NOT_FOUND);

      const updatedData = Object.fromEntries(
        Object.entries(updateUser).filter(([key, value]) => value !== undefined && value !== null)
      );

      await this.userRepository.update(updateUser.id, updatedData);

      return await this.userRepository.findOne({ where: { id: updateUser.id } });

    } catch (error) {
      this.logger.error(error);
      throw new HttpException("USER_UPDATE", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUsers(createUser: createUser) {
    try {

      const passwordHash = hashSync(createUser.password, 10);

      const user = this.userRepository.create({ ...createUser, password: passwordHash });

      if (!user) return null;

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException("USER_CREATE", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUser(email: string, username: string) {
    return await this.userRepository.findOne({ where: [{ email }, { username }] });
  }

  async findByID(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async validateUser(loginDto: validateUser) {
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
