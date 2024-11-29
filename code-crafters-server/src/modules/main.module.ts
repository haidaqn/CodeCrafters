import { Module } from "@nestjs/common";
import { MailModule } from "./mail";
import { UserModule } from "./user";
import { AppCacheModule } from "./cache";
import { SubmissionModule } from "./submission";

@Module({
  imports: [
    MailModule,
    UserModule,
    SubmissionModule,
    AppCacheModule
  ]
})
export class MainModule {
}