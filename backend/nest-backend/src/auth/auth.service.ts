import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
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
  constructor(private usersService: UsersService) {}

  async googleLogin(req: GoogleRequest) {
    if (!req.user) {
      return 'No user from google';
    }
    return await this.usersService.findOrCreateUser(
      req.user.email,
      req.user.googleId,
      req.user.name,
    );
  }
}
