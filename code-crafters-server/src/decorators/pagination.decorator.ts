import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { PaginationDto } from "../types/paging";

export const Pagination = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<PaginationDto> => {
    const request = ctx.switchToHttp().getRequest();
    const { limit, page, sortBy, sortType, search } = request.query;

    const paginationDto = plainToClass(PaginationDto, {
      limit: limit ? parseInt(limit, 10) : 10,
      page: page ? parseInt(page, 10) : 1,
      sortBy: sortBy || "createdAt",
      sortType: sortType || "DESC",
      search: search || ""
    });

    const errors = await validate(paginationDto);
    if (errors.length > 0) {
      throw new BadRequestException("Invalid pagination parameters");
    }

    return paginationDto;
  }
);

