import { forwardRef, Module } from "@nestjs/common";
import { ContestController } from "./contest.controller";
import { ContestService } from "./contest.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";
import { Contest } from "./contest.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest]),
    forwardRef(() => UserModule)
  ],
  controllers: [ContestController],
  providers: [ContestService, LoggerService, CacheService]
})
export class ContestModule {
}