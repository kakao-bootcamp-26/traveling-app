import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, GoogleRequest } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() _req: GoogleRequest, @Res() _res: Response) {
    try {
      const jwt = await this.authService.googleLogin(_req);
      _res.cookie('jwt', jwt, { httpOnly: true, secure: false });

      const frontAddress = this.configService.get<string>('FRONT_ADDRESS');
      return _res.redirect(`${frontAddress}/main`);
    } catch (error) {
      const frontAddress = this.configService.get<string>('FRONT_ADDRESS');
      return _res.redirect(`${frontAddress}/error`);
    }
  }
}
