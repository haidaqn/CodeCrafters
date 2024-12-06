import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { ContestRankingService } from "./contest-ranking.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types/paging";

@Controller("contest-ranking")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContestRankingController {

  constructor(
    private readonly contestRankingService: ContestRankingService
  ) {
  }

  @Post("")
  public async create(
    @Body() createContestRankingDto: any
  ) {
    return await this.contestRankingService.create(createContestRankingDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: string
  ) {
    return await this.contestRankingService.get(id);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: string,
    @Body() updateContestRankingDto: any
  ) {
    return await this.contestRankingService.update(id, updateContestRankingDto);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ) {
    return await this.contestRankingService.delete(id);
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
    return await this.contestRankingService.list(pagination);
  }


}