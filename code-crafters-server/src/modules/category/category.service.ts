import { Injectable } from "@nestjs/common";
import { ESortType, PaginationDto } from "../../types";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { Category } from "./category.entity";
import { CategoryDto } from "./category.dto";
import { Messages } from "../../config";
import { CacheService } from "../cache";


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async list(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10, sortBy = "createdAt", sortType = ESortType.DESC, search } = paginationDto;

      const cacheKey = `categories:${page}:${limit}:${sortBy}:${sortType}:${search}`;

      return await this.cache.auto(cacheKey, true, 30, async () => {
        const skip = (page - 1) * limit;

        const query = this.categoryRepository.createQueryBuilder("category");

        if (search) {
          query.andWhere("category.name LIKE :search", { search: `%${search}%` });
        }

        if (![ESortType.ASC, ESortType.DESC].includes(sortType)) {
          throw new Error("Invalid sortType. Must be \"ASC\" or \"DESC\".");
        }

        query.orderBy(`category.${sortBy}`, sortType);
        query.skip(skip).take(limit);
        const [categories, total] = await query.getManyAndCount();

        this.logger.log(`Fetched ${cacheKey} categories (Total: ${total})`);

        const totalPages = Math.ceil(total / limit);

        return {
          paginate: categories,
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

  async create(createCategoryDto: CategoryDto) {
    const findCategory = await this.findCategoryByName(createCategoryDto.name);

    if (findCategory) {
      throw new Error(Messages.category.categoryNameInvalid);
    }

    const categoryNew = this.categoryRepository.create({ name: createCategoryDto.name });

    if (!categoryNew) {
      throw new Error(Messages.common.somethingWentWrong);
    }

    await this.categoryRepository.save(categoryNew);

    await this.cache.delByPattern("categories:*");

    return {
      data: categoryNew,
      message: Messages.category.categoryCreated
    };

  }

  async delete(id: number) {
    const categoryOld = await this.findCategoryByID(id);

    if (!categoryOld) {
      new Error(Messages.category.categoryNotFound);
    }

    await this.categoryRepository.remove(categoryOld);
    await this.cache.delByPattern("categories:*");
    return {
      message: Messages.category.categoryDeleted
    };
  }

  async update(id: number, updateCategoryDto: CategoryDto) {
    const categoryOld = await this.findCategoryByID(id);

    if (!categoryOld) {
      new Error(Messages.category.categoryNotFound);
    }

    const categoryWithSameName = await this.findCategoryByName(updateCategoryDto.name);
    if (categoryWithSameName && categoryWithSameName.id !== id) {
      new Error(Messages.category.categoryNameExists);
    }

    categoryOld.name = updateCategoryDto.name;

    await this.categoryRepository.save(categoryOld);
    await this.cache.delByPattern("categories:*");
    return {
      data: categoryOld,
      message: Messages.category.categoryUpdated
    };

  }

  private async findCategoryByName(name: string) {
    try {
      return await this.categoryRepository.findOne({ where: { name } });
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }

  async findCategoryByID(id: number) {
    try {
      return await this.categoryRepository.findOne({ where: { id } });
    } catch (error: any) {
      this.logger.error(error.message);
    }
  }

}

