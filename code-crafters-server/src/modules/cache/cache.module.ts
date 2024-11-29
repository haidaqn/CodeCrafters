import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RedisModule } from "@songkeys/nestjs-redis";
import { CacheService } from "./cache.service";

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        config: {
          url: configService.get<string>("redis.uri"),
          port: configService.get<number>("redis.port"),
          host: configService.get<string>("redis.host")
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class AppCacheModule {
}