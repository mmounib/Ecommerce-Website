import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken'; // Import the jwt library
import { IsString } from 'class-validator';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get('AT_SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'at' in req.cookies && req.cookies.at.length > 0) {
      return req.cookies.at;
    }
    return null;
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
        email: payload.email,
      },
    });

    if (!user) throw new UnauthorizedException('must refresh token');

    return payload;
  }
}
