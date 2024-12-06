import { Module } from "@nestjs/common";
import { CronService } from "./cron.service";
import { EmailService, MailModule } from "../mail";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [
    MailModule,
    QueueModule
  ],
  providers: [CronService, EmailService]
})
export class CronModule {
}
