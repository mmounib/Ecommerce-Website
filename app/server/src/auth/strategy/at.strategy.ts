import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

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

  async validate(payload: { id: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });

    if (!user) throw new UnauthorizedException('must refresh token');

    return payload;
  }
}
