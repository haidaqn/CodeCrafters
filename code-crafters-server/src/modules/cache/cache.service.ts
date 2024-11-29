import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { InjectRedis } from "@songkeys/nestjs-redis";

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis() private redis: Redis
  ) {
    this.redis.flushall();
  }

  async auto<T>(key: string, stringify: boolean, ttl: number, cacheFn: () => Promise<T>): Promise<T> {
    if (await this.exists(key)) {
      // get data
      const data = await this.get(key);
      if (stringify) return JSON.parse(data as string) as T;
      return data as T;
    }
    const data = await cacheFn() as T;
    this.set(key, stringify ? JSON.stringify(data) : data as string, ttl);
    return data;
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async exists(key: string) {
    return this.redis.exists(key);
  }

  async push(key: string, ...values: (string | number | Buffer)[]) {
    return this.redis.lpush(key, ...values);
  }

  getAll(key: string) {
    return this.redis.lrange(key, 0, -1);

  }

  delByValue(key: string, value: string | Buffer) {
    return this.redis.lrem(key, 1, value);
  }

  updateByValue(key: string, index: number, newValue: string) {
    return this.redis.lset(key, index, newValue);
  }

  getLength(key: string) {
    return this.redis.llen(key);
  }

  set(key: string, value: string | number | Buffer, ttl?: number) {
    this.redis.expire(key, ttl);
    return this.redis.set(key, value);
  }

  del(key: string) {
    this.redis.del(key);
  }
}
