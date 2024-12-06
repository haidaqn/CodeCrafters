import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { PaginationDto } from "../../types/paging";
import { ContestParticipant } from "./contest-participant.entity";
import { CreateContestParticipantDTO, UpdateContestParticipantDTO } from "./contest-participant.dto";

@Injectable()
export class ContestParticipantService {

  constructor(
    @InjectRepository(ContestParticipant)
    private readonly contestParticipantRepository: Repository<ContestParticipant>,
    private readonly logger: LoggerService,
    private readonly cache: CacheService
  ) {
  }

  async create(userID: number, createContestParticipantDto: CreateContestParticipantDTO) {
  }

  async get(id: number) {
  }

  async update(id: number, updateContestParticipantDto: UpdateContestParticipantDTO) {
  }

  async delete(id: number) {
  }

  async list(paginationDto: PaginationDto) {
  }
}