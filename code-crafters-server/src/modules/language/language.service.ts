import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { ESortType, PaginationDto } from "../../types/paging";
import { Language } from "./language.entity";
import { CreateLanguageDTO, UpdateLanguageDTO } from "./language.dto";
import { Messages } from "../../config";

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createLanguageDto: CreateLanguageDTO) {
    const language = await this.languageRepository.findOne({
      where: {
        name: createLanguageDto.name,
        version: createLanguageDto.version
      }
    });

    if (language) {
      throw new Error(Messages.language.languageExists);
    }

    const data = this.languageRepository.create(createLanguageDto);

    if (!data) {
      throw new Error(Messages.common.somethingWentWrong);
    }

    await this.languageRepository.save(data);
    await this.cache.delByPattern("languages:*");
    return {
      data,
      message: Messages.language.languageCreated
    };


  }

  async get(id: number) {
    const language = await this.languageRepository.findOne({ where: { id } });

    if (!language) {
      throw new NotFoundException(Messages.language.languageNotFound);
    }

    return {
      data: language
    };

  }

  async update(id: number, updateLanguageDto: UpdateLanguageDTO) {
    const { data: language } = await this.get(id);

    if (!language.isActivated) {
      throw new BadRequestException("Language is deactivated and cannot be updated.");
    }

    const { name, version, isActivated } = updateLanguageDto;

    if (name && name !== language.name) {
      language.name = name;
    }

    if (version) {
      language.version = version;
    }

    if (typeof isActivated === "boolean") {
      language.isActivated = isActivated;
    }

    const updatedLanguage = await this.languageRepository.save(language);
    await this.cache.delByPattern("languages:*");
    return {
      data: updatedLanguage,
      message: Messages.language.languageUpdated
    };

  }

  async delete(id: number) {
    const { data: language } = await this.get(id);

    if (!language) {
      throw new NotFoundException(Messages.language.languageNotFound);
    }

    await this.languageRepository.remove(language);
    await this.cache.delByPattern("languages:*");
    return {
      message: Messages.language.languageDeleted
    };
  }

  async list(paginationDto: PaginationDto) {
    try {
      const { page = 1, limit = 10, sortBy = "createdAt", sortType = ESortType.DESC, search } = paginationDto;

      const cacheKey = `languages:${page}:${limit}:${sortBy}:${sortType}:${search}`;

      return await this.cache.auto(cacheKey, true, 30, async () => {
        const skip = (page - 1) * limit;

        const query = this.languageRepository.createQueryBuilder("language");

        if (search) {
          query.andWhere("language.name LIKE :search", { search: `%${search}%` });
        }

        if (![ESortType.ASC, ESortType.DESC].includes(sortType)) {
          throw new Error("Invalid sortType. Must be \"ASC\" or \"DESC\".");
        }

        query.orderBy(`language.${sortBy}`, sortType);
        query.skip(skip).take(limit);
        const [languages, total] = await query.getManyAndCount();

        this.logger.log(`Fetched ${cacheKey} language (Total: ${total})`);

        const totalPages = Math.ceil(total / limit);

        return {
          paginate: languages,
          page: page,
          totalPages,
          hasNext: page < totalPages,
          totalItems: total
        };
      });


    } catch (error) {
      this.logger.error(error.message);
    }
  }
}