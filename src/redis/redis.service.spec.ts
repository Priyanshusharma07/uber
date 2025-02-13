import { Test, TestingModule } from '@nestjs/testing';
import { redisService } from './redis.service';

describe('RedisService', () => {
  let service: redisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [redisService],
    }).compile();

    service = module.get<redisService>(redisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
