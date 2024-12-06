import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";


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
  limit?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  sortBy?: string = "createdAt";

  @IsOptional()
  @IsString()
  @IsEnum(ESortType)
  sortType?: ESortType.ASC;
}
