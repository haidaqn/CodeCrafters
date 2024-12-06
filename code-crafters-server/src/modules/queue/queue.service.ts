import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue("email") private emailQueue: Queue,
    @InjectQueue("submit") private submitQueue: Queue
  ) {
  }

  async enqueueEmail(emailData: any) {
    await this.emailQueue.add("sendEmail", emailData);
  }

  async enqueueSubmitCode(submitData: any) {
    await this.submitQueue.add("submitCode", submitData);
  }
}
