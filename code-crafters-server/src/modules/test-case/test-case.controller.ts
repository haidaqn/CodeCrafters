import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { TestCaseService } from "./test-case.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types/paging";
import { CreateTestCaseDTO, UpdateTestCaseDTO } from "./test-case.dto";
import { AdminRequired } from "../user/decorators/permission.decorator";

@Controller("test-case")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TestCaseController {

  constructor(
    private readonly testCaseService: TestCaseService
  ) {
  }

  @Post("")
  @AdminRequired()
  public async create(
    @Body() createTestCaseDto: CreateTestCaseDTO
  ) {
    return await this.testCaseService.create(createTestCaseDto);
  }

  @Get(":id")
  @AdminRequired()
  public async get(
    @Param("id") id: number
  ) {
    return await this.testCaseService.get(id);
  }

  @Patch(":id")
  @AdminRequired()
  public async update(
    @Param("id") id: number,
    @Body() updateTestCaseDto: UpdateTestCaseDTO
  ) {
    return await this.testCaseService.update(id, updateTestCaseDto);
  }

  @Delete(":id")
  @AdminRequired()
  public async delete(
    @Param("id") id: number
  ) {
    return await this.testCaseService.delete(id);
  }

  @Get()
  @AdminRequired()
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