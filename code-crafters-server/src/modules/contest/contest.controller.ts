import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { ContestService } from "./contest.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types/paging";

@Controller("contests")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContestController {

  constructor(
    private readonly contestService: ContestService
  ) {
  }

  @Post("")
  public async create(
    @Body() createContestDto: any
  ) {
    return await this.contestService.create(createContestDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: string
  ) {
    return await this.contestService.get(id);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: string,
    @Body() updateContestDto: any
  ) {
    return await this.contestService.update(id, updateContestDto);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
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