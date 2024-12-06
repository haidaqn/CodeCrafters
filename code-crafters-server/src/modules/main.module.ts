import { Module } from "@nestjs/common";
import { MailModule } from "./mail";
import { UserModule } from "./user";
import { AppCacheModule } from "./cache";
import { ScheduleModule } from "@nestjs/schedule";
import { CronModule } from "./cron";
import { QueueModule } from "./queue";

@Module({
  imports: [
    AppCacheModule,
    MailModule,
    UserModule,
    ScheduleModule.forRoot(),
    CronModule,
    QueueModule
  ]
})
export class MainModule {
}