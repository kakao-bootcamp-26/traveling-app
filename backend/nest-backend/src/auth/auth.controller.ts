import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, GoogleRequest } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() _req: GoogleRequest, @Res() _res: Response) {
    try {
      const jwt = await this.authService.googleLogin(_req);
      // return {
      //   statusCode: 200,
      //   data: user,
      //   message: 'User login success',
      // };
      // JWT를 쿠키에 저장하고 클라이언트로 리다이렉트
      _res.cookie('jwt', jwt, { httpOnly: true, secure: false }); // secure: true는 HTTPS에서만 전송
      return _res.redirect('http://localhost:5173/main'); // 로그인 후 리다이렉트할 프론트엔드 페이지
    } catch (error) {
      return _res.redirect('http://localhost:5173/error');

      // return {
      //   statusCode: 500,
      //   message: 'Google login failed',
      //   error: 'Internal Server Error',
      // };
    }
  }
}
