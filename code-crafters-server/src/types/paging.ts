import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export enum ESortType {
  ASC = "ASC",
  DESC = "DESC"
}

export class PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number(value))
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number(value))
  page?: number;

  @IsOptional()
  @IsString()
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsEnum(ESortType)
  @Transform(({value}) => value?.toUpperCase())
  sortType?: ESortType = ESortType.ASC;
}
