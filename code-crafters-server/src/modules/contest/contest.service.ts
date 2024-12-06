import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { PaginationDto } from "../../types/paging";
import { Contest } from "./contest.entity";

@Injectable()
export class ContestService {

  constructor(
    @InjectRepository(Contest)
    private readonly problemRepository: Repository<Contest>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createContestDto: any) {
  }

  async get(id: string) {
  }

  async update(id: string, updateContestDto: any) {
  }

  async delete(id: string) {
  }

  async list(paginationDto: PaginationDto) {
  }
}