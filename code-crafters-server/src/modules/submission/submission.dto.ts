import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class SubmitCodeDto {
  @ApiProperty({
    description: "Ngôn ngữ lập trình được sử dụng",
    example: "python",
    enum: ["python", "java", "javascript", "cpp"]
  })
  @IsNotEmpty({ message: "Ngôn ngữ lập trình không được để trống." })
  @IsString({ message: "Ngôn ngữ lập trình phải là chuỗi." })
  @IsIn(["python", "java", "javascript", "cpp"], {
    message: "Ngôn ngữ không hợp lệ, chỉ chấp nhận: python, java, javascript, cpp."
  })
  language: string;

  @ApiProperty({
    description: "Mã nguồn của chương trình",
    example: "print(\"Hello, World!\")"
  })
  @IsNotEmpty({ message: "Code không được để trống." })
  @IsString({ message: "Code phải là chuỗi ký tự." })
  code: string;

  @ApiProperty({
    description: "Dữ liệu đầu vào (input) cho chương trình",
    example: "5\n10\n",
    required: false
  })
  // @IsOptional()
  @IsString({ message: "Input phải là chuỗi ký tự." })
  input: string;

  @ApiProperty({
    description: "Giới hạn thời gian chạy chương trình (giây)",
    example: 5,
    minimum: 0,
    maximum: 30
  })
  @IsNotEmpty({ message: "Giới hạn thời gian không được để trống." })
  @Min(0, { message: "Giới hạn thời gian tối thiểu là 1 giây." })
  @Max(30, { message: "Giới hạn thời gian tối đa là 30 giây." })
  timeLimit: number;
}
