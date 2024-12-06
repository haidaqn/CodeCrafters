import { forwardRef, Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { LoggerService } from "../../logger";
import { CacheService } from "../cache";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { UserModule } from "../user";

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => UserModule)
  ],
  controllers: [CategoryController],
  providers: [CategoryService, LoggerService, CacheService],
  exports: [CategoryService]
})
export class CategoryModule {
}