import { forwardRef, Module } from "@nestjs/common";
import { LanguageController } from "./language.controller";
import { LanguageService } from "./language.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";
import { Language } from "./language.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Language]),
    forwardRef(() => UserModule)
  ],
  controllers: [LanguageController],
  providers: [LanguageService, LoggerService, CacheService],
  exports: [LanguageService]
})
export class LanguageModule {
}