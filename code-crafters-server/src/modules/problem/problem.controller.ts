import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { ProblemService } from "./problem.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types";
import { CreateProblemDTO, UpdateProblemDTO } from "./problem.dto";
import { AdminRequired } from "../user/decorators/permission.decorator";

@Controller("api/v1/problems")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProblemController {

  constructor(
    private readonly problemService: ProblemService
  ) {
  }

  @Post("")
  @AdminRequired()
  public async create(
    @Body() createProblemDto: CreateProblemDTO
  ) {
    return await this.problemService.create(createProblemDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: number
  ) {
    return await this.problemService.get(id);
  }

  @Patch(":id")
  @AdminRequired()
  public async update(
    @Param("id") id: number,
    @Body() updateProblemDto: UpdateProblemDTO
  ) {
    return await this.problemService.update(id, updateProblemDto);
  }

  @Delete(":id")
  @AdminRequired()
  public async delete(
    @Param("id") id: number
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