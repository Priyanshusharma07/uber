// auth.service.ts
import {  Injectable } from '@nestjs/common';
import { redisService } from 'src/redis/redis.service';
import { PasetoService } from './token/paseto.service';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly redisService: redisService,
        private readonly paseto:PasetoService,

    ) { }

    async generateOTP(): Promise<string> {
        return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
    }

    async email_generate_otp(email: string) {
        try {
            let otp = await this.generateOTP();
            await this.redisService.setData(email, otp, 200);
            return otp;
        } catch (error) {
            // console.log(error);
            return error
        }
    }
    
    async verify_email_otp(email: string, otp: string) {
        try {
            const otp_stored = await this.redisService.getData(email);
            console.log(otp_stored);
            if (otp == otp_stored) {
                const payload = { email }; // Can add other fields if needed
                const token = this.paseto.createToken(payload);
                return token;
            } else {
                return "Try again"
            }
        } catch (error) {
            throw new Error('OTP sending failed: ' + error.message);
        }
    }

    async Mobile_otp_gen(mobile: string) {
        try {
            const otp = await this.generateOTP();
            await this.redisService.setData(mobile, otp, 200);
            return otp;
        } catch (error) {
            return error;
        }
    }


    async verify_mobile_otp(mobile: string, otp: string) {
        try {
            const otp_stored = await this.redisService.getData(mobile);
            if (otp == otp_stored) {
                const payload = { mobile }; // Can add other fields if needed
                const token = this.paseto.createToken(payload);
                return token;
            } else {
                return "try Again";
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async googleLogin(req) {
        if (!req.user) {
          return { message: 'No user from Google' };
        }
    
        return {
          message: 'User successfully authenticated',
          user: req.user,
        };
      }

    
}


