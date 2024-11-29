import { Module } from "@nestjs/common";
import { DockerService } from "./docker.service";
import { LoggerService } from "../logger";

@Module({
  providers: [DockerService, LoggerService],
  exports: [DockerService]
})
export class DockerModule {
}