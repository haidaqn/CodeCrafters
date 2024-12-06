import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { AdminRequired } from "../user/decorators/permission.decorator";
import { CategoryService } from "./category.service";
import { PaginationDto } from "../../types/paging";
import { Pagination } from "../../decorators";
import { CategoryDto } from "./category.dto";


@Controller("categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "sortBy", required: false, type: String })
  @ApiQuery({ name: "sortType", required: false, type: String })
  @ApiQuery({ name: "search", required: false, type: String })
  public async get(
    @Pagination() pagination: PaginationDto
  ) {
    return await this.categoryService.list(pagination);
  }

  @Post()
  @AdminRequired()
  public async create(
    @Body() createCategoryDto: CategoryDto
  ) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Delete(":id")
  @AdminRequired()
  public async delete(
    @Param("id") id: number
  ) {
    return await this.categoryService.delete(id);
  }

  @Patch(":id")
  @AdminRequired()
  public async update(
    @Param("id") id: number,
    @Body() updateCategoryDto: CategoryDto
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

}