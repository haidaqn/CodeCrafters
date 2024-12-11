import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SubmitCodeDto } from "./submission.dto";
import { SubmissionService } from "./submission.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard, Payload } from "../../auth";
import { ReqUser } from "../../decorators";


@Controller("submission")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService
  ) {
  }

  @Post()
  public async submitCode(
    @Body() submitCodeDto: SubmitCodeDto,
    @ReqUser() user: Payload
  ) {
    return await this.submissionService.submitCode(submitCodeDto, user.id);
  }
}