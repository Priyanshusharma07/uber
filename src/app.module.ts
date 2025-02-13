import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { redisService } from './redis/redis.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/uber'),
    RedisModule.forRoot({
      config: {
        host: 'localhost', // Replace with your Redis host
        port: 6379, // Replace with your Redis port
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, redisService],
})
export class AppModule {}
