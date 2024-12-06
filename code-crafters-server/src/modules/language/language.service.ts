import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { PaginationDto } from "../../types/paging";
import { Language } from "./language.entity";

@Injectable()
export class LanguageService {

  constructor(
    @InjectRepository(Language)
    private readonly problemRepository: Repository<Language>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createLanguageDto: any) {
  }

  async get(id: string) {
  }

  async update(id: string, updateLanguageDto: any) {
  }

  async delete(id: string) {
  }

  async list(paginationDto: PaginationDto) {
  }
}