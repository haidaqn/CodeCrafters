import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class SubmitCodeDto {
  @ApiProperty({
    description: "ID của bài toán",
    example: 1
  })
  @IsNotEmpty({ message: "Problem ID không được để trống." })
  @IsInt({ message: "Problem ID phải là một số nguyên." })
  problemID: number;

  @ApiProperty({
    description: "ID của ngôn ngữ",
    example: 1
  })
  @IsNotEmpty({ message: "languageID không được để trống." })
  @IsInt({ message: "languageID phải là một số nguyên." })
  languageID: number;

  @ApiProperty({
    description: "Mã nguồn của chương trình",
    example: "print(\"Hello, World!\")"
  })
  @IsNotEmpty({ message: "Code không được để trống." })
  @IsString({ message: "Code phải là chuỗi ký tự." })
  code: string;
}
