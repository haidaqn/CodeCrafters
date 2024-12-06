import { forwardRef, Module } from "@nestjs/common";
import { ContestParticipantController } from "./contest-participant.controller";
import { ContestParticipantService } from "./contest-participant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { CacheService } from "../cache";
import { LoggerService } from "../../logger";
import { ContestParticipant } from "./contest-participant.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ContestParticipant]),
    forwardRef(() => UserModule)
  ],
  controllers: [ContestParticipantController],
  providers: [ContestParticipantService, LoggerService, CacheService]
})
export class ContestParticipantModule {
}