import { Injectable, NotFoundException } from "@nestjs/common";
import { SubmitCodeDto } from "./submission.dto";
import { QueueService } from "../queue/queue.service";
import { TestCaseService } from "../test-case";
import { LanguageService } from "../language";
import { ProblemService } from "../problem";
import { Messages } from "../../config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Submission } from "./submission.entity";
import { STATUS_SUBMISSION } from "../../types";

@Injectable()
export class SubmissionService {

  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
    private readonly queueService: QueueService,
    private readonly testCaseService: TestCaseService,
    private readonly languageService: LanguageService,
    private readonly problemService: ProblemService
  ) {
  }

  async update(submissionId: number, data: any) {
    return this.submissionRepository.update(submissionId, data);
  }

  async submitCode(submitCodeDto: SubmitCodeDto, userID: number) {

    const { problemID, code, languageID } = submitCodeDto;

    const { data: language } = await this.languageService.get(languageID);

    if (!language) throw new NotFoundException(Messages.language.languageNotFound);

    const { data: problem } = await this.problemService.get(problemID);

    if (!problem) throw new NotFoundException(Messages.problem.problemNotFound);

    const testCases = await this.testCaseService.getTestCases(problemID);

    if (!testCases || testCases.length === 0) {
      throw new NotFoundException(Messages.testCase.testCaseNotFound);
    }

    const submission = await this.submissionRepository.save({
      userID: userID,
      problemID: problemID,
      languageID: languageID,
      code: code,
      status: STATUS_SUBMISSION.PENDING,
      memoryUsed: 0
    });

    const clientId = `user-${userID}`;

    await this.queueService.enqueueSubmitCode({
      clientId,
      submissionId: submission.id,
      code, language: language.name,
      testCases,
      timeLimit: problem.timeLimit
    });

    // let allTestCasesPassed: boolean = true;
    // let totalMemoryUsed: number = 0;
    // let maxMemoryUsed: number = 0;
    //
    // for (const testCase of testCases) {
    //   const { input, output } = testCase;
    //   const timeLimit = problem.timeLimit;
    //
    //   try {
    //     const result = await this.dockerService.runCode({
    //       code,
    //       language: language.name,
    //       input,
    //       timeLimit
    //     });
    //
    //     const passed = result.output.trim() === output.trim();
    //     totalMemoryUsed += result.memoryUsed;
    //     maxMemoryUsed = Math.max(maxMemoryUsed, result.memoryUsed);
    //     if (!passed) allTestCasesPassed = false;
    //
    //     this.gateway.sendTestCaseResult(clientId, {
    //       submissionId: submission.id,
    //       maxMemoryUsed,
    //       passed
    //     });
    //
    //   } catch (error: any) {
    //     allTestCasesPassed = false;
    //     this.loggerService.error(error);
    //   }
    // }
    //
    // const statusSubmit = allTestCasesPassed ? STATUS_SUBMISSION.AC : STATUS_SUBMISSION.WA;
    //
    // await this.submissionRepository.update(submission.id, {
    //   status: statusSubmit,
    //   memoryUsed: maxMemoryUsed
    // });
    //
    // this.gateway.sendSubmissionResult(clientId, {
    //   submissionId: submission.id,
    //   maxMemoryUsed,
    //   statusSubmit
    // });
    // return {
    //   message: statusSubmit,
    //   submissionID: submission.id,
    //   memoryUsed: maxMemoryUsed,
    //   totalMemoryUsed
    // };
  }
}