import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Category,
  Contest,
  ContestParticipant,
  ContestRanking,
  Language,
  Problem,
  Submission,
  TestCase,
  User
} from "../modules";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "mysql",
          host: configService.get<string>("db.host"),
          port: +configService.get<number>("db.port_db"),
          username: configService.get<string>("db.namedb"),
          password: configService.get<string>("db.password"),
          database: configService.get<string>("db.database"),
          entities: [User, Category, Language, Problem, TestCase, Contest, ContestRanking, ContestParticipant, Submission],
          synchronize: true,
          driver: require("mysql2")
        };
      },
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {
}
