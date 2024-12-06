import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { ESortType, PaginationDto } from "../../types/paging";
import { TestCase } from "./test-case.entity";
import { CreateTestCaseDTO, UpdateTestCaseDTO } from "./test-case.dto";
import { Messages } from "../../config";
import { ProblemService } from "../problem";

@Injectable()
export class TestCaseService {

  constructor(
    @InjectRepository(TestCase)
    private readonly testCaseRepository: Repository<TestCase>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService,
    private readonly problemService: ProblemService
  ) {
  }

  async create(createTestCaseDto: CreateTestCaseDTO) {
    let problem = null;

    try {
      problem = await this.problemService.get(createTestCaseDto.problemID);
    } catch (error) {
      this.logger.error(error.message);
    }

    if (!problem) {
      throw new NotFoundException(Messages.problem.problemNotFound);
    }

    const testCase = this.testCaseRepository.create(createTestCaseDto);

    if (!testCase) {
      throw new Error(Messages.common.somethingWentWrong);
    }

    await this.testCaseRepository.save(testCase);
    await this.cache.delByPattern("test-case:*");

    return {
      data: testCase,
      message: Messages.testCase.testCaseCreated
    };
  }

  async get(id: number) {
    const testCase = await this.testCaseRepository.findOne({ where: { id } });

    if (!testCase) {
      throw new NotFoundException(Messages.testCase.testCaseNotFound);
    }

    return {
      data: testCase
    };
  }

  async update(id: number, updateTestCaseDto: UpdateTestCaseDTO) {
    const { data: testCase } = await this.get(id);
    if (!testCase) {
      throw new NotFoundException(Messages.testCase.testCaseNotFound);
    }

    if (updateTestCaseDto.problemID) {
      let problem = null;
      try {
        problem = await this.problemService.get(updateTestCaseDto.problemID);
      } catch (error) {
        this.logger.error(error.message);
      }
      if (!problem) {
        throw new NotFoundException(Messages.problem.problemNotFound);
      }
      testCase.problemID = updateTestCaseDto.problemID;
    }

    Object.keys(updateTestCaseDto).forEach(key => {
      if (updateTestCaseDto[key] !== undefined) {
        testCase[key] = updateTestCaseDto[key];
      }
    });

    await this.testCaseRepository.save(testCase);
    await this.cache.delByPattern("test-case:*");

    return {
      data: testCase,
      message: Messages.testCase.testCaseUpdated
    };
  }

  async delete(id: number) {
    const { data: testCase } = await this.get(id);

    if (!testCase) {
      throw new NotFoundException(Messages.testCase.testCaseNotFound);
    }

    await this.testCaseRepository.remove(testCase);
    await this.cache.delByPattern("test-case:*");

    return {
      message: Messages.testCase.testCaseDeleted
    };
  }

  async list(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10, sortBy = "createdAt", sortType = ESortType.DESC, search } = paginationDto;

      const cacheKey = `test-case:${page}:${limit}:${sortBy}:${sortType}:${search}`;

      return await this.cache.auto(cacheKey, true, 30, async () => {
          const skip = (page - 1) * limit;

          const query = this.testCaseRepository.createQueryBuilder("test-case");

          if (![ESortType.ASC, ESortType.DESC].includes(sortType)) {
            throw new Error("Invalid sortType. Must be \"ASC\" or \"DESC\".");
          }

          query.orderBy(`test-case.${sortBy}`, sortType);
          query.skip(skip).take(limit);
          const [testCases, total] = await query.getManyAndCount();

          this.logger.log(`Fetched ${cacheKey} test-case (Total: ${total})`);

          const totalPages = Math.ceil(total / limit);

          return {
            paginate: testCases,
            page: page,
            totalPages,
            hasNext: page < totalPages,
            totalItems: total
          };
        }
      );
    } catch
      (error) {
      this.logger.error(error.message);
    }
  }
}