import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { PaginationDto } from "../../types/paging";
import { TestCase } from "./test-case.entity";

@Injectable()
export class TestCaseService {

  constructor(
    @InjectRepository(TestCase)
    private readonly testCaseRepository: Repository<TestCase>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createTestCaseDto: any) {
  }

  async get(id: string) {
  }

  async update(id: string, updateTestCaseDto: any) {
  }

  async delete(id: string) {
  }

  async list(paginationDto: PaginationDto) {
  }
}