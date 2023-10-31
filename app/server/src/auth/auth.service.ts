import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Tokens } from '../Types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          hash,
        },
      });
      const [accessToken, refreshToken] = await Promise.all([
        this.newAccessToken(user.id, user.email),
        this.newRefreshToken(user.id, user.email),
      ]);
      await this.updateRtHash(user.id, refreshToken);
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signin(dto: LoginDto) {
    // find the user by the email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user doesn't exist throw exception
    if (!user) throw new ForbiddenException('Email incorrect');
    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('password incorrect');
    const [accessToken, refreshToken] = await Promise.all([
      this.newAccessToken(user.id, user.email),
      this.newRefreshToken(user.id, user.email),
    ]);
    await this.updateRtHash(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async getData(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    // if user doesn't exist throw exception
    if (!user) throw new UnauthorizedException('invalid token');
    // compare password
    delete user.hash;
    return user;
  }

  async logout(userId: number, token: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    try {
      await this.prisma.revocatedTokens.create({
        data: {
          token,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt)
      throw new UnauthorizedException('invalid token');
    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new UnauthorizedException('invalid token');
    const token = await this.newAccessToken(user.id, user.email);
    return {
      name: 'at',
      value: token,
      date: 60 * 30,
    };
  }

  async newAccessToken(userId: number, email: string) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.config.get('AT_SECRET'),
        expiresIn: 60 * 30,
      },
    );
  }

  async newRefreshToken(userId: number, email: string) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.config.get('RT_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      },
    );
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  setCookie(res: Response, token: Tokens) {
    res.cookie(token.name, token.value, {
      sameSite: 'strict',
      httpOnly: true,
      secure: false,
      path: '/',
      expires: new Date(Date.now() + token.date * 1000),
    });
  }

  setCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    this.setCookie(res, {
      name: 'at',
      value: tokens.accessToken,
      date: 60 * 30,
    });
    this.setCookie(res, {
      name: 'rt',
      value: tokens.refreshToken,
      date: 60 * 60 * 24 * 7,
    });
  }
}
