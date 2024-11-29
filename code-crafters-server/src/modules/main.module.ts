import { Module } from "@nestjs/common";
import { MailModule } from "./mail";
import { UserModule } from "./user";
import { AppCacheModule } from "./cache";

@Module({
  imports: [
    MailModule,
    UserModule,
    AppCacheModule
  ]
})
export class MainModule {
}