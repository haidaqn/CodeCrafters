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
    await this.set(key, stringify ? JSON.stringify(data) : data as string, ttl);
    return data;
  }

  async getKeysByPattern(pattern: string): Promise<string[]> {
    let cursor = "0";
    const keys: string[] = [];

    do {
      const [newCursor, result] = await this.redis.scan(cursor, "MATCH", pattern);
      cursor = newCursor;
      keys.push(...result);
    } while (cursor !== "0");

    return keys;
  }

  async delByPattern(pattern: string): Promise<void> {
    const keys = await this.getKeysByPattern(pattern);
    if (keys.length > 0) {
      await Promise.all(keys.map(key => this.del(key)));
      console.log(`Deleted keys matching pattern: ${pattern}`);
    }
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

  async getAll(key: string) {
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

  async set(key: string, value: string | number | Buffer, ttl?: number) {
    this.redis.expire(key, ttl);
    return this.redis.set(key, value);
  }

  async del(key: string) {
    this.redis.del(key);
  }
}
