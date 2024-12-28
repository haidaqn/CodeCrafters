import { Module } from "@nestjs/common";
import {
  AppCacheModule,
  CategoryModule,
  ContestModule,
  ContestParticipant,
  LanguageModule,
  MailModule,
  ProblemModule,
  SubmissionModule,
  TestCaseModule,
  UserModule
} from "./modules";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { configuration } from "./config";
import { DatabaseModule } from "./database";
import { LoggerModule } from "./logger";
import { AuthModule } from "./auth";
import { QueueModule } from "./modules/queue";
import { ScheduleModule } from "@nestjs/schedule";
import { CronModule } from "./modules/cron";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    LoggerModule,
    CategoryModule,
    ContestModule,
    ProblemModule,
    ContestParticipant,
    LanguageModule,
    ProblemModule,
    SubmissionModule,
    TestCaseModule,
    QueueModule,
    AppCacheModule,
    MailModule,
    UserModule,
    AuthModule,
    CronModule
  ]
})
export class AppModule {
}
