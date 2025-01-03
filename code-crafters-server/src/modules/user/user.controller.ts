import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./user.dto";
import {PaginationDto} from "src/types/paging";
import {ApiBearerAuth, ApiQuery} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../auth";
import {AdminRequired} from "./decorators/permission.decorator";
import {IdsDTo} from "../../types";

@Controller("api/v1/users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Get(":id")
  public async get(
    @Param("id") id: number
  ) {
    return await this.userService.get(id);
  }

  @Patch(":id")
  public async update(
    @Param("id") id: number,
    @Body() updateUser: UpdateUserDto
  ) {
    return await this.userService.update(id, updateUser);
  }

  @Post("block")
  public async block(
    @Body() blockUserDto: IdsDTo
  ) {
    return await this.userService.block(blockUserDto.ids);
  }

  @Get()
  @AdminRequired()
  @ApiQuery({name: "page", required: false, type: String})
  @ApiQuery({name: "limit", required: false, type: String})
  @ApiQuery({name: "sortBy", required: false, type: String})
  @ApiQuery({name: "sortType", required: false, type: String})
  @ApiQuery({name: "search", required: false, type: String})
  public async list(
    @Query() paginationDto: PaginationDto
  ) {
    return await this.userService.list(paginationDto);
  }
}