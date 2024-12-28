import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { LoggerService } from "../../logger";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheService } from "../cache";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, LoggerService, CacheService],
  exports: [UserService]
})
export class UserModule {
}