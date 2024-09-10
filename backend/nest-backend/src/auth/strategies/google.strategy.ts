import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { Profile } from 'passport';
import { Users } from '@/users/users.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    console.log(
      'Google Client Secret:',
      configService.get<string>('GOOGLE_CLIENT_SECRET'),
    );
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<Users> {
    const { id, name, emails } = profile;

    const user = await this.userService.findOrCreateUser(
      emails[0].value,
      id,
      name.givenName,
    );

    // accessToken을 사용자 정보에 추가 (선택사항)
    //  user.accessToken = accessToken;

    return user;
  }
}
