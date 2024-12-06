import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { Problem } from "./problem.entity";
import { PaginationDto } from "../../types/paging";

@Injectable()
export class ProblemService {

  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createProblemDto: any) {
  }

  async get(id: string) {
  }

  async update(id: string, updateProblemDto: any) {
  }

  async delete(id: string) {
  }

  async list(paginationDto: PaginationDto) {
  }
}