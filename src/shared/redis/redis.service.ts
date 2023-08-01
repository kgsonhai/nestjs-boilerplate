import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { AppLogger } from '../logger/app-logger';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    });
  }

  async setValue(key: string, value: any, expireTime = 60): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
    await this.redisClient.expire(key, expireTime);
  }

  async getValue(key: string): Promise<any | null> {
    const result = await this.redisClient.get(key);
    return result ? JSON.parse(result) : null;
  }

  async deleteValue(key: string): Promise<any | null> {
    return this.redisClient.del(key);
  }
}
