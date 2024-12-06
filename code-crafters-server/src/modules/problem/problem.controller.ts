import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { ProblemService } from "./problem.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types/paging";

@Controller("problems")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProblemController {

  constructor(
    private readonly problemService: ProblemService
  ) {
  }

  @Post("")
  public async create(
    @Body() createProblemDto: any
  ) {
    return await this.problemService.create(createProblemDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: string
  ) {
    return await this.problemService.get(id);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: string,
    @Body() updateProblemDto: any
  ) {
    return await this.problemService.update(id, updateProblemDto);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ) {
    return await this.problemService.delete(id);
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
    return await this.problemService.list(pagination);
  }


}