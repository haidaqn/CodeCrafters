import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { ESortType, PaginationDto } from "../../types/paging";
import { Contest } from "./contest.entity";
import { CreateContestDTO, UpdateContestDTO } from "./contest.dto";
import { Messages } from "../../config";

@Injectable()
export class ContestService {

  constructor(
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createContestDto: CreateContestDTO) {
    const { startTime, endTime, title } = createContestDto;

    if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException("Start time must be before end time.");
    }

    const contest = this.contestRepository.create({
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });

    await this.cache.delByPattern("contests:*");

    return {
      data: await this.contestRepository.save(contest),
      message: Messages.contest.contestCreated
    };

  }

  async get(id: number) {
    const contest = await this.contestRepository.findOne({ where: { id } });

    if (!contest) {
      throw new NotFoundException(Messages.contest.contestNotFound);
    }

    return {
      data: contest
    };

  }

  async update(id: number, updateContestDto: UpdateContestDTO) {
    const { data: contest } = await this.get(id);

    const { title, startTime, endTime } = updateContestDto;

    if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException("Start time must be before end time.");
    }


    if (title) contest.title = title;
    if (startTime && new Date(startTime) < new Date(contest.endTime)) contest.startTime = new Date(startTime);
    if (endTime && new Date(endTime) > new Date(contest.startTime)) contest.endTime = new Date(endTime);

    const updatedContest = await this.contestRepository.save(contest);
    await this.cache.delByPattern("contests:*");

    return { data: updatedContest, message: Messages.contest.contestUpdated };

  }

  async delete(id: number) {
    const { data: contest } = await this.get(id);

    await this.contestRepository.remove(contest);
    await this.cache.delByPattern("contests:*");

    return {
      message: Messages.contest.contestDeleted
    };

  }

  async list(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10, sortBy = "createdAt", sortType = ESortType.DESC, search } = paginationDto;
      const cacheKey = `contests:${page}:${limit}:${sortBy}:${sortType}:${search}`;

      return await this.cache.auto(cacheKey, true, 30, async () => {
          const skip = (page - 1) * limit;

          const query = this.contestRepository.createQueryBuilder("contest");

          if (search) {
            query.andWhere("contest.name LIKE :search", { search: `%${search}%` });
          }

          if (![ESortType.ASC, ESortType.DESC].includes(sortType)) {
            throw new Error("Invalid sortType. Must be \"ASC\" or \"DESC\".");
          }

          query.orderBy(`contest.${sortBy}`, sortType);
          query.skip(skip).take(limit);
          const [contests, total] = await query.getManyAndCount();

          this.logger.log(`Fetched ${cacheKey} categories (Total: ${total})`);

          const totalPages = Math.ceil(total / limit);

          return {
            paginate: contests,
            page: page,
            totalPages,
            hasNext: page < totalPages,
            totalItems: total
          };
        }
      );
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }
}