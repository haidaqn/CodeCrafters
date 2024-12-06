import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { PaginationDto } from "../../types/paging";
import { ContestParticipant } from "./contest-participant.entity";

@Injectable()
export class ContestParticipantService {

  constructor(
    @InjectRepository(ContestParticipant)
    private readonly contestParticipantRepository: Repository<ContestParticipant>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(createContestParticipantDto: any) {
  }

  async get(id: string) {
  }

  async update(id: string, updateContestParticipantDto: any) {
  }

  async delete(id: string) {
  }

  async list(paginationDto: PaginationDto) {
  }
}