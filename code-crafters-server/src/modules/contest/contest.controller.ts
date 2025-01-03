import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { ContestService } from "./contest.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types/paging";
import { CreateContestDTO, UpdateContestDTO } from "./contest.dto";
import { AdminRequired } from "../user/decorators/permission.decorator";

@Controller("api/v1/contests")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContestController {

  constructor(
    private readonly contestService: ContestService
  ) {
  }

  @Post("")
  @AdminRequired()
  public async create(
    @Body() createContestDto: CreateContestDTO
  ) {
    return await this.contestService.create(createContestDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: number
  ) {
    return await this.contestService.get(id);
  }

  @Patch(":id")
  @AdminRequired()
  public async update(
    @Param("id") id: number,
    @Body() updateContestDto: UpdateContestDTO
  ) {
    return await this.contestService.update(id, updateContestDto);
  }

  @Delete(":id")
  @AdminRequired()
  public async delete(
    @Param("id") id: number
  ) {
    return await this.contestService.delete(id);
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
    return await this.contestService.list(pagination);
  }
}