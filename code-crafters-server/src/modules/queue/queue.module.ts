import { forwardRef, Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigService } from "@nestjs/config";
import * as consumers from "./consumers";
import { QueueService } from "./queue.service";
import { EmailService } from "../mail";
import { DockerService } from "../../docker";
import { LoggerService } from "../../logger";
import { SubmissionModule } from "../submission";

@Module({
  imports: [
    forwardRef(() => SubmissionModule),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>("redis.uri"),
          port: configService.get<number>("redis.port"),
          host: configService.get<string>("redis.host")
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue(
      { name: "email" },
      { name: "submit" }
    )
  ],
  providers: [
    ...Object.values(consumers),
    QueueService,
    EmailService,
    DockerService,
    LoggerService
  ],
  exports: [QueueService]
})
export class QueueModule {
}