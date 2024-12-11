import { Module } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { SubmissionController } from "./submission.controller";
import { DockerService } from "../../docker";
import { SubmissionGateway } from "./submission.gateway";
import { QueueModule } from "../queue";
import { TestCaseModule } from "../test-case";
import { LanguageModule } from "../language";
import { ProblemModule } from "../problem";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    QueueModule,
    TestCaseModule,
    LanguageModule,
    ProblemModule
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, DockerService, SubmissionGateway, LoggerService, CacheService],
  exports: [SubmissionService, SubmissionGateway]
})
export class SubmissionModule {
}
