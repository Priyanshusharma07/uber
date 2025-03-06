import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly UserService:UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });

    console.log('Google Client ID:', configService.get<string>('GOOGLE_CLIENT_ID')); // Debugging
  }

  // async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
  //   const user = {
  //     email: profile.emails[0].value,
  //     firstName: profile.name.givenName,
  //     lastName: profile.name.familyName,
  //     picture: profile.photos[0].value,
  //     accessToken,
  //   };
    
  //   done(null, user);
  // }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const email = profile.emails[0].value;
  
    // Check if the user already exists
    let user = await this.userModel.findOne({ email });
  
    if (user) {
      console.log(`User already exists: ${user.email}`);
    } else {
      console.log(`New user detected, creating: ${email}`);
      
      // Create new user if not found
      user = new this.userModel({
        email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        picture: profile.photos[0].value,
        googleId: profile.id,
      });
      await user.save();
    }
  
    // Return the user
    done(null, user);
  } 
}
