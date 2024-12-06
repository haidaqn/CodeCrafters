import { Module } from "@nestjs/common";
import {
  CategoryModule,
  ContestModule,
  ContestParticipant,
  MainModule,
  ProblemModule,
  SubmissionModule,
  TestCaseModule
} from "./modules";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { configuration } from "./config";
import { DatabaseModule } from "./database";
import { LoggerModule } from "./logger";
import { AuthModule } from "./auth";
import { LanguageModule } from "./modules/language/language.module";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    DatabaseModule,
    LoggerModule,
    AuthModule,
    CategoryModule,
    ContestModule,
    ProblemModule,
    ContestParticipant,
    LanguageModule,
    ProblemModule,
    SubmissionModule,
    TestCaseModule,
    MainModule
  ]
})
export class AppModule {
}
