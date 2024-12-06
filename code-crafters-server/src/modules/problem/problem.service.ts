import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { Problem } from "./problem.entity";
import { ESortType, PaginationDto } from "../../types/paging";
import { CreateProblemDTO, UpdateProblemDTO } from "./problem.dto";
import { Messages } from "../../config";
import { CategoryService } from "../category";

@Injectable()
export class ProblemService {

  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService,
    private readonly categoryService: CategoryService
  ) {
  }

  async create(createProblemDto: CreateProblemDTO) {

    let category = null;

    try {
      category = await this.categoryService.findCategoryByID(createProblemDto.categoryID);
    } catch (error: any) {
      this.logger.error(error.message);
    }

    if (!category) {
      throw new NotFoundException(Messages.category.categoryNotFound);
    }

    const problem = this.problemRepository.create(createProblemDto);

    if (!problem) {
      throw new Error(Messages.common.somethingWentWrong);
    }

    await this.problemRepository.save(problem);
    await this.cache.delByPattern("problems:*");

    return {
      data: problem,
      message: Messages.problem.problemCreated
    };
  }

  async get(id: number) {

    const cacheKey = `problems-${id}`;

    return await this.cache.auto(cacheKey, true, 30, async () => {
      const problem = await this.problemRepository.findOne({ where: { id } });

      if (!problem) {
        throw new NotFoundException(Messages.problem.problemNotFound);
      }

      return {
        data: problem
      };
    });
  }

  async update(id: number, updateProblemDto: UpdateProblemDTO) {
    const { data: problem } = await this.get(id);

    if (!problem) {
      throw new NotFoundException(Messages.problem.problemNotFound);
    }

    if (updateProblemDto.categoryID) {
      let category = null;
      try {
        category = await this.categoryService.findCategoryByID(updateProblemDto.categoryID);
      } catch (error: any) {
        this.logger.error(error.message);
      }

      if (!category) {
        throw new NotFoundException(Messages.category.categoryNotFound);
      }
      problem.categoryID = updateProblemDto.categoryID;
    }

    Object.keys(updateProblemDto).forEach(key => {
      if (updateProblemDto[key] !== undefined) {
        problem[key] = updateProblemDto[key];
      }
    });

    await this.problemRepository.save(problem);
    await this.cache.delByPattern("problems:*");

    return {
      data: problem,
      message: Messages.problem.problemUpdated
    };


  }

  async delete(id: number) {
    const { data: problem } = await this.get(id);

    if (!problem) {
      throw new NotFoundException(Messages.problem.problemNotFound);
    }

    await this.problemRepository.remove(problem);
    await this.cache.delByPattern("problems:*");

    return {
      message: Messages.problem.problemDeleted
    };

  }

  async list(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10, sortBy = "createdAt", sortType = ESortType.DESC, search } = paginationDto;

      const cacheKey = `problems:${page}:${limit}:${sortBy}:${sortType}:${search}`;

      return await this.cache.auto(cacheKey, true, 30, async () => {

        const skip = (page - 1) * limit;

        const query = this.problemRepository.createQueryBuilder("problem");

        if (search) {
          query.andWhere("problem.title LIKE :search OR problem.description LIKE :search", { search: `%${search}%` });
        }

        if (![ESortType.ASC, ESortType.DESC].includes(sortType)) {
          throw new Error("Invalid sortType. Must be \"ASC\" or \"DESC\".");
        }

        query.orderBy(`problem.${sortBy}`, sortType);
        query.skip(skip).take(limit);
        const [problems, total] = await query.getManyAndCount();

        this.logger.log(`Fetched ${cacheKey} problem (Total: ${total})`);

        const totalPages = Math.ceil(total / limit);

        return {
          paginate: problems,
          page: page,
          totalPages,
          hasNext: page < totalPages,
          totalItems: total
        };

      });

    } catch (error: any) {
      this.logger.error(error.message);
    }
  }
}