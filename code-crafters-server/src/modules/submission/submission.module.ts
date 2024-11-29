import { Module } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { SubmissionController } from "./submission.controller";
import { DockerService } from "../../docker";

@Module({
  imports: [],
  controllers: [SubmissionController],
  providers: [SubmissionService, DockerService]
})
export class SubmissionModule {
}
