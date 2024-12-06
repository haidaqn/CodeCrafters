import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard, Payload } from "../../auth";
import { ContestParticipantService } from "./contest-participant.service";
import { Pagination, ReqUser } from "../../decorators";
import { PaginationDto } from "../../types/paging";
import { CreateContestParticipantDTO, UpdateContestParticipantDTO } from "./contest-participant.dto";

@Controller("contest-participant")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContestParticipantController {

  constructor(
    private readonly contestParticipantService: ContestParticipantService
  ) {
  }

  @Post("")
  public async create(
    @Body() createContestParticipantDto: CreateContestParticipantDTO,
    @ReqUser() user: Payload
  ) {
    return await this.contestParticipantService.create(user.id, createContestParticipantDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: number
  ) {
    return await this.contestParticipantService.get(id);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: number,
    @Body() updateContestParticipantDto: UpdateContestParticipantDTO
  ) {
    return await this.contestParticipantService.update(id, updateContestParticipantDto);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: number
  ) {
    return await this.contestParticipantService.delete(id);
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "sortBy", required: false, type: String })
  @ApiQuery({ name: "sortType", required: false, type: String })
  @ApiQuery({ name: "search", required: false, type: String })
  public async list(
    @Pagination() pagination: PaginationDto
  ) {
    return await this.contestParticipantService.list(pagination);
  }


}