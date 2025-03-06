import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { redisService } from 'src/redis/redis.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { PasetoService } from './token/paseto.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './token/Google.strategy';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './token/facebook.strategy';
import { User, UserSchema } from 'src/schema/user.schema';
import { GithubStrategy } from './token/git.strategy';
import { UserModule } from 'src/user/user.module';


@Module({
  imports:[RedisModule,ConfigModule.forRoot({ isGlobal: true }),PassportModule,UserModule],
  controllers: [AuthController],
  providers: [AuthService,redisService,PasetoService,GoogleStrategy,FacebookStrategy,GithubStrategy]
})
export class AuthModule {}