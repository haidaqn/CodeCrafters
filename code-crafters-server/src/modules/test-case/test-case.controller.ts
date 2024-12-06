import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { TestCaseService } from "./test-case.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types/paging";

@Controller("test-case")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TestCaseController {

  constructor(
    private readonly testCaseService: TestCaseService
  ) {
  }

  @Post("")
  public async create(
    @Body() createTestCaseDto: any
  ) {
    return await this.testCaseService.create(createTestCaseDto);
  }

  @Get(":id")
  public async get(
    @Param("id") id: string
  ) {
    return await this.testCaseService.get(id);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: string,
    @Body() updateTestCaseDto: any
  ) {
    return await this.testCaseService.update(id, updateTestCaseDto);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ) {
    return await this.testCaseService.delete(id);
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
    return await this.testCaseService.list(pagination);
  }


}