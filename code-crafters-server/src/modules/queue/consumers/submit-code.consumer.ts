import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { DockerService } from "../../../docker";
import { STATUS_SUBMISSION, SubmitCodeJobData, SubmitCodeResult } from "../../../types";
import { LoggerService } from "../../../logger";
import { SubmissionGateway, SubmissionService } from "../../submission";

@Processor("submit")
export class SubmitCodeConsumer extends WorkerHost {

  constructor(
    private readonly dockerService: DockerService,
    private readonly logger: LoggerService,
    private readonly gateway: SubmissionGateway,
    private readonly submission: SubmissionService
  ) {
    super();
  }

  async process(job: Job<SubmitCodeJobData, SubmitCodeResult>): Promise<any> {
    const { clientId, submissionId, code, language, timeLimit, testCases, problem } = job.data;
    let allTestCasesPassed: boolean = true;
    let totalMemoryUsed: number = 0;
    let maxMemoryUsed: number = 0;

    for (const testCase of testCases) {
      const { input, output } = testCase;
      const timeLimit = problem.timeLimit;

      try {
        const result = await this.dockerService.runCode({
          code,
          language: language.name,
          input,
          timeLimit
        });

        const passed = result.output.trim() === output.trim();
        totalMemoryUsed += result.memoryUsed;
        maxMemoryUsed = Math.max(maxMemoryUsed, result.memoryUsed);
        if (!passed) allTestCasesPassed = false;

        // this.gateway.sendTestCaseResult(clientId, {
        //   submissionId,
        //   maxMemoryUsed,
        //   passed
        // });

      } catch (error: any) {
        allTestCasesPassed = false;
        this.logger.error(error);
      }
    }

    const statusSubmit = allTestCasesPassed ? STATUS_SUBMISSION.AC : STATUS_SUBMISSION.WA;

    // await this.submissionService.update(submissionId, {
    //   status: statusSubmit,
    //   memoryUsed: maxMemoryUsed
    // });

    // this.gateway.sendSubmissionResult(clientId, {
    //   submissionId,
    //   maxMemoryUsed,
    //   statusSubmit
    // });
  }

  @OnWorkerEvent("active")
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data
      )}...`
    );
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job) {
    console.log(
      `Failed job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data
      )}...`
    );
  }
}
