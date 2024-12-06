import { forwardRef, Module } from "@nestjs/common";
import { TestCaseController } from "./test-case.controller";
import { TestCaseService } from "./test-case.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";
import { TestCase } from "./test-case.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TestCase]),
    forwardRef(() => UserModule)
  ],
  controllers: [TestCaseController],
  providers: [TestCaseService, LoggerService, CacheService]
})
export class TestCaseModule {
}