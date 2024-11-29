import { Injectable } from "@nestjs/common";
import { SubmitCodeDto } from "./submission.dto";
import { DockerService } from "../../docker";
import { STATUS_SUBMISSION } from "../../types";

@Injectable()
export class SubmissionService {

  constructor(
    private readonly dockerService: DockerService
  ) {
  }



  async submitCode(submitCodeDto: SubmitCodeDto) {
    const result = await this.dockerService.runCode(submitCodeDto);
    return {
      message: result.status,
      output: result.output,
    };
  }

}