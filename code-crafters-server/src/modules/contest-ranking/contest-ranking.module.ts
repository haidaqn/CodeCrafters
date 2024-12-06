import { forwardRef, Module } from "@nestjs/common";
import { ContestRankingController } from "./contest-ranking.controller";
import { ContestRankingService } from "./contest-ranking.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";
import { ContestRanking } from "./contest-ranking.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ContestRanking]),
    forwardRef(() => UserModule)
  ],
  controllers: [ContestRankingController],
  providers: [ContestRankingService, LoggerService, CacheService]
})
export class ContestRankingModule {
}