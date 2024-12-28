import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth";
import { LanguageService } from "./language.service";
import { Pagination } from "../../decorators";
import { PaginationDto } from "../../types";
import { CreateLanguageDTO, UpdateLanguageDTO } from "./language.dto";
import { AdminRequired } from "../user/decorators/permission.decorator";
import { BlockUserDto } from "../user";

@Controller("api/v1/languages")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LanguageController {

  constructor(
    private readonly languageService: LanguageService
  ) {
  }

  @Post("")
  @AdminRequired()
  public async create(
    @Body() createLanguageDto: CreateLanguageDTO
  ) {
    return await this.languageService.create(createLanguageDto);
  }

  @Get(":id")
  @AdminRequired()
  public async get(
    @Param("id") id: number
  ) {
    return await this.languageService.get(id);
  }

  @Patch(":id")
  @AdminRequired()
  public async update(
    @Param("id") id: number,
    @Body() updateLanguageDto: UpdateLanguageDTO
  ) {
    return await this.languageService.update(id, updateLanguageDto);
  }

  @Post("block")
  @AdminRequired()
  public async delete(
    @Body() blockDto: BlockUserDto
  ) {
    return await this.languageService.block(blockDto.ids);
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
    return await this.languageService.list(pagination);
  }
}