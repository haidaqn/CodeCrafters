import { forwardRef, Module } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { SubmissionController } from "./submission.controller";
import { TestCaseModule } from "../test-case";
import { LanguageModule } from "../language";
import { ProblemModule } from "../problem";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { QueueModule } from "../queue";
import { SubmissionGateway } from "./submission.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    forwardRef(() => QueueModule),
    TestCaseModule,
    LanguageModule,
    ProblemModule
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionGateway],
  exports: [SubmissionService, SubmissionGateway]
})
export class SubmissionModule {
}