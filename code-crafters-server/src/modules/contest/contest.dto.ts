import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateContestDTO {
  @ApiProperty({
    description: "The title of the contest",
    example: "Programming Challenge 2024"
  })
  @IsString()
  @IsNotEmpty({ message: "Title is required." })
  @MinLength(3, { message: "Title must be at least 3 characters long." })
  @MaxLength(100, { message: "Title must not exceed 100 characters." })
  title: string;

  @ApiProperty({
    description: "The start time of the contest",
    example: "2024-12-01T09:00:00Z"
  })
  @IsNotEmpty({ message: "Start time is required." })
  @IsDate({ message: "Start time must be a valid date." })
  startTime: Date;

  @ApiProperty({
    description: "The end time of the contest",
    example: "2024-12-01T12:00:00Z"
  })
  @IsNotEmpty({ message: "End time is required." })
  @IsDate({ message: "End time must be a valid date." })
  endTime: Date;
}


export class UpdateContestDTO {
  @ApiProperty({
    description: "The title of the contest",
    example: "Programming Challenge 2024"
  })
  @IsOptional()
  @MinLength(3, { message: "Title must be at least 3 characters long." })
  @MaxLength(100, { message: "Title must not exceed 100 characters." })
  title?: string;

  @ApiProperty({
    description: "The start time of the contest",
    example: "2024-12-01T09:00:00Z"
  })
  @IsOptional()
  @IsDate({ message: "Start time must be a valid date." })
  startTime?: Date;

  @ApiProperty({
    description: "The end time of the contest",
    example: "2024-12-01T12:00:00Z"
  })
  @IsOptional()
  @IsDate({ message: "End time must be a valid date." })
  endTime?: Date;
}
