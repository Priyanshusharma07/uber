import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class redisService {
    private redisClient;

    constructor(private readonly redisService: RedisService) {
        this.redisClient = this.redisService.getOrNil();
    }

    async setData(key: string, value: string, ttlInSeconds: number): Promise<string> {
        return this.redisClient.set(key, value, 'EX', ttlInSeconds)
    };

    async getData<T>(key: string): Promise<T | null> {
       const data = await this.redisClient.get(key);
       return data ? JSON.parse(data) : null;
    }

    async deleteKey(key: string): Promise<number> {
        return this.redisClient.del(key);
    }
}

