import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTestCaseDTO {
  @ApiProperty({
    description: "The ID of the problem that the test case belongs to",
    example: 1,
    required: true
  })
  @IsInt()
  @IsNotEmpty()
  problemID: number;

  @ApiProperty({
    description: "The input of the test case",
    example: "5 10",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  input: string;

  @ApiProperty({
    description: "The expected output of the test case",
    example: "15",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  output: string;
}

export class UpdateTestCaseDTO {
  @ApiProperty({
    description: "The ID of the problem that the test case belongs to",
    example: 1,
    required: false
  })
  @IsInt()
  @IsOptional()
  problemID?: number;

  @ApiProperty({
    description: "The input of the test case",
    example: "5 10",
    required: false
  })
  @IsString()
  @IsOptional()
  input?: string;

  @ApiProperty({
    description: "The expected output of the test case",
    example: "15",
    required: false
  })
  @IsString()
  @IsOptional()
  output?: string;

  @ApiProperty({
    description: "Whether the test case is activated or not",
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  isActivated?: boolean;
}
