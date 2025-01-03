import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLanguageDTO {
  @ApiProperty({
    description: "The name of the programming language",
    example: "Python"
  })
  @IsString()
  @IsNotEmpty({ message: "Language name is required." })
  @MaxLength(50, { message: "Language name must not exceed 50 characters." })
  name: string;

  @ApiProperty({
    description: "The version of the programming language",
    example: "3.10.2"
  })
  @IsString()
  @IsNotEmpty({ message: "Version is required." })
  @MaxLength(20, { message: "Version must not exceed 20 characters." })
  version: string;

  @ApiProperty({
    description: "Whether the language is activated",
    example: true,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isActivated?: boolean;
}

export class UpdateLanguageDTO {
  @ApiProperty({
    description: "The name of the programming language",
    example: "Python",
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: "Language name must not exceed 50 characters." })
  name?: string;

  @ApiProperty({
    description: "The version of the programming language",
    example: "3.10.2",
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(20, { message: "Version must not exceed 20 characters." })
  version?: string;

  @ApiProperty({
    description: "Whether the language is activated",
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActivated?: boolean;
}