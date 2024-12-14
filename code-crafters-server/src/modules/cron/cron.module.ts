import { Module } from "@nestjs/common";
import { CronService } from "./cron.service";
import { EmailService, MailModule } from "../mail";
import { QueueModule } from "../queue";
import { UserModule } from "../user";

@Module({
  imports: [
    MailModule,
    QueueModule,
    UserModule
  ],
  providers: [CronService, EmailService]
})
export class CronModule {
}
