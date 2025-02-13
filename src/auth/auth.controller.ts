import { Controller, Get, Param, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('email-otp-generate')
    @ApiQuery({ name: 'email', required: true })
    async getUser(@Query('email') email: string) {
        return this.authService.email_generate_otp(email);
    }
    
    @Post('verify-email-otp')
    @ApiQuery({ name: 'email', required: true })
    @ApiQuery({ name: 'otp', required: true })
    async sendOtp(@Query('email') email: string,
        @Query('otp') otp: string
    ) {
        return this.authService.verify_email_otp(email, otp);
    }

    @Get('mobile-otp-generate')
    @ApiQuery({ name: 'mobile', required: true })
    async verifyUserMobile(@Query('mobile') mobile: string) {
        return this.authService.Mobile_otp_gen(mobile);
    }


    @Post('verify-mobile-otp')
    @ApiQuery({ name: 'mobile', required: true })
    @ApiQuery({ name: 'otp', required: true })
    async verifyOtp(@Query('mobile') mobile: string, @Query('otp') otp: string) {
        return this.authService.verify_mobile_otp(mobile, otp);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        return { message: 'Redirecting to Google authentication...' };
    }
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
      return this.authService.googleLogin(req);
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth(@Req() req) {
      // Redirects user to Facebook login page
    }
  
    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Req() req) {
      return {
        message: 'Facebook login successful',
        user: req.user,
      };
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    async githubAuth() {
      return;
    }
  
    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    githubAuthCallback(@Req() req) {
      return req.user;
    }
    
}


