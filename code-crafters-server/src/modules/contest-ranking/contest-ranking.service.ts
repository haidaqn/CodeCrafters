import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { PaginationDto } from "../../types/paging";
import { ContestRanking } from "./contest-ranking.entity";

@Injectable()
export class ContestRankingService {

  constructor(
    @InjectRepository(ContestRanking)
    private readonly contestRankingRepository: Repository<ContestRanking>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createContestRankingDto: any) {
  }

  async get(id: string) {
  }

  async update(id: string, updateContestRankingDto: any) {
  }

  async delete(id: string) {
  }

  async list(paginationDto: PaginationDto) {
  }
}