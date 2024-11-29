import { Body, Controller, Post } from "@nestjs/common";
import { SubmitCodeDto } from "./submission.dto";
import { SubmissionService } from "./submission.service";


@Controller("submission")
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService
  ) {
  }

  @Post()
  public async submitCode(
    @Body() submitCodeDto: SubmitCodeDto
  ) {
    return await this.submissionService.submitCode(submitCodeDto);
  }
}