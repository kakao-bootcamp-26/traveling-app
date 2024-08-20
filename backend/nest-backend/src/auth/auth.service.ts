import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface GoogleUser {
  email: string;
  googleId: string;
  name: string;
}

interface GoogleRequest extends Request {
  user?: GoogleUser;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(req: GoogleRequest) {
    if (!req.user) {
      return 'No user from google';
    }

    const { email, googleId, name } = req.user;

    const user = await this.usersService.findOrCreateUser(
      email,
      googleId,
      name,
    );

    const payload = { email, googleId, name };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
