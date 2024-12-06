import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CategoryDto {
  @ApiProperty({
    description: "The name of the category",
    example: "Technology"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: "Category name must be at least 3 characters long." })
  @MaxLength(50, { message: "Category name must not exceed 50 characters." })
  name: string;
}


