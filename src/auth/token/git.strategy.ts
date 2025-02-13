import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
        clientID: configService.get<string>('GITHUB_CLIENT_ID'),
        clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
        callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'), // Ensure this matches GitHub settings!
        scope: ['user:email'],
      });
      
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    const user = {
      id: profile.id,
      username: profile.username,
      email: profile.emails?.[0]?.value || null,
      name: profile.displayName || profile.username,
      avatar: profile.photos?.[0]?.value || null,
      accessToken,
    };
    done(null, user);
  }
}
