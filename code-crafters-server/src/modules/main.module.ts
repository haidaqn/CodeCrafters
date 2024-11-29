import { Module } from "@nestjs/common";
import { MailModule } from "./mail";
import { UserModule } from "./user";

@Module({
  imports: [MailModule, UserModule]
})
export class MainModule {
}