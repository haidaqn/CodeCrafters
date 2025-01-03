import {ApiProperty} from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min
} from "class-validator";
import {DIFFICULT} from "../../types";

export class CreateProblemDTO {
  @ApiProperty({
    description: "The title of the problem",
    example: "Two Sum"
  })
  @IsString()
  @IsNotEmpty({message: "Title is required."})
  @MaxLength(100, {message: "Title must not exceed 100 characters."})
  title: string;

  @ApiProperty({
    description: "The description of the problem",
    example: "Given an array of integers nums and an integer target..."
  })
  @IsString()
  @IsNotEmpty({message: "Description is required."})
  description: string;

  @ApiProperty({
    description: "The difficulty level of the problem",
    example: DIFFICULT.EASY,
    enum: DIFFICULT
  })
  @IsEnum(DIFFICULT, {message: "Difficulty must be one of the allowed values."})
  difficult: DIFFICULT;

  @ApiProperty({
    description: "The time limit for the problem in seconds",
    example: 1.0
  })
  @IsNumber()
  @Min(1, {message: "Time limit must be greater than 1s"})
  timeLimit: number;

  @ApiProperty({
    description: "The ID of the category this problem belongs to",
    example: 5
  })
  @IsInt()
  @IsNotEmpty({message: "Category ID is required."})
  categoryID: number;

  @ApiProperty({
    description: "The points awarded for solving the problem",
    example: 100
  })
  @IsInt()
  @Min(1, {message: "Points must be at least 1."})
  points: number;
}

export class UpdateProblemDTO {
  @ApiProperty({
    description: "The title of the problem",
    example: "Two Sum",
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, {message: "Title must not exceed 100 characters."})
  title?: string;

  @ApiProperty({
    description: "The description of the problem",
    example: "Given an array of integers nums and an integer target...",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The difficulty level of the problem",
    example: DIFFICULT.MEDIUM,
    enum: DIFFICULT,
    required: false
  })
  @IsOptional()
  @IsEnum(DIFFICULT, {message: "Difficulty must be one of the allowed values."})
  difficult?: DIFFICULT;

  @ApiProperty({
    description: "The time limit for the problem in seconds",
    example: 2.0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0.1, {message: "Time limit must be greater than 0."})
  timeLimit?: number;

  @ApiProperty({
    description: "The ID of the category this problem belongs to",
    example: 5,
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsInt({each: true})
  categoryIDs?: number[];

  @ApiProperty({
    description: "The ID of the contest this problem belongs to",
    example: 5,
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsInt({each: true})
  contestIDs?: number[];

  @ApiProperty({
    description: "The points awarded for solving the problem",
    example: 100,
    required: false
  })
  @IsOptional()
  @IsInt()
  @Min(1, {message: "Points must be at least 1."})
  points?: number;

  @ApiProperty({
    description: "Whether the problem is activated",
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActivated?: boolean;
}