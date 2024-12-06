import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateContestParticipantDTO {
  @ApiProperty({
    description: "The ID of the contest",
    example: 1
  })
  @IsInt()
  @IsNotEmpty({ message: "Contest ID is required." })
  contestID: number;

  @ApiProperty({
    description: "The ID of the user",
    example: 42
  })
  @IsInt()
  @IsNotEmpty({ message: "User ID is required." })
  userID: number;

  @ApiProperty({
    description: "The registration time of the participant",
    example: "2024-12-06T10:30:00Z",
    required: false
  })
  @IsNotEmpty()
  @IsDate({ message: "Register time must be a valid date." })
  registerTime?: Date;

  @ApiProperty({
    description: "The total score of the participant",
    example: 85.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: "Total score must be a positive number." })
  totalScore?: number;
}

export class UpdateContestParticipantDTO {
  @ApiProperty({
    description: "The ID of the contest",
    example: 1
  })
  @IsInt()
  @IsNotEmpty({ message: "Contest ID is required." })
  contestID: number;

  @ApiProperty({
    description: "The ID of the user",
    example: 42
  })
  @IsInt()
  @IsNotEmpty({ message: "User ID is required." })
  userID: number;

  @ApiProperty({
    description: "The registration time of the participant",
    example: "2024-12-06T10:30:00Z",
    required: false
  })
  @IsOptional()
  @IsDate({ message: "Register time must be a valid date." })
  registerTime?: Date;

  @ApiProperty({
    description: "The total score of the participant",
    example: 85.5,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: "Total score must be a positive number." })
  totalScore?: number;
}