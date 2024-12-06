import { forwardRef, Module } from "@nestjs/common";
import { ProblemController } from "./problem.controller";
import { ProblemService } from "./problem.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { Problem } from "./problem.entity";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";

@Module({
  imports: [
    TypeOrmModule.forFeature([Problem]),
    forwardRef(() => UserModule)
  ],
  controllers: [ProblemController],
  providers: [ProblemService, LoggerService, CacheService]
})
export class ProblemModule {
}