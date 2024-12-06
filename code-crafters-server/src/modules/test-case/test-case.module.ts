import { forwardRef, Module } from "@nestjs/common";
import { TestCaseController } from "./test-case.controller";
import { TestCaseService } from "./test-case.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";
import { TestCase } from "./test-case.entity";
import { ProblemModule } from "../problem";

@Module({
  imports: [
    TypeOrmModule.forFeature([TestCase]),
    forwardRef(() => UserModule),
    forwardRef(() => ProblemModule)
  ],
  controllers: [TestCaseController],
  providers: [TestCaseService, LoggerService, CacheService]
})
export class TestCaseModule {
}