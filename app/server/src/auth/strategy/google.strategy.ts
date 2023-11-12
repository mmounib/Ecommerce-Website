import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      clientID: config.get('CLIENT_ID'),
      clientSecret: config.get('CLIENT_SECRET'),
      callbackURL: config.get('CALL_BACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.validateUser({
      accessToken: accessToken,
      refreshToken: refreshToken,
      email: profile.emails[0].value,
      username: profile.displayName,
    });
    return user || null;
  }

  async validateUser(userDetails: {
    accessToken: string;
    refreshToken: string;
    email: string;
    username: string;
  }) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userDetails.email,
      },
    });
    const result = user
      ? { id: user.id, email: user.email }
      : await this.prisma.user.create({
          data: {
            email: userDetails.email,
            username: userDetails.username,
          },
        });
  
    return { id: result.id, email: result.email };
  }
  
}
