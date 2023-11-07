import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { AtGuard, RtGuard } from '../common/guards';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('google/login')
  @UseGuards(AtGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AtGuard)
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) throw new UnauthorizedException('invalid token');
    const [accessToken, refreshToken] = await Promise.all([
      this.authService.newAccessToken(req.user['id'], req.user['email']),
      this.authService.newRefreshToken(req.user['id'], req.user['email']),
    ]);
    await this.authService.updateRtHash(req.user['id'], refreshToken);
    this.authService.setCookies(res, { accessToken, refreshToken });
    return res.status(HttpStatus.OK).send();
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    const tokens = await this.authService.signup(dto);
    this.authService.setCookies(res, tokens);
    return res.status(HttpStatus.CREATED).send();
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.signin(dto);
    this.authService.setCookies(res, tokens);
    return res.status(HttpStatus.OK).send();
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    const isRevocated = await this.prisma.revocatedTokens.findUnique({
      where: {
        token: req.cookies.at,
      },
    });
    if (isRevocated) throw new UnauthorizedException('invalid token');
    return this.authService.logout(req.user['id'], req.cookies.at);
  }

  @UseGuards(AtGuard)
  @Get('')
  async getData(@Req() req: Request) {
    const isRevocated = await this.prisma.revocatedTokens.findUnique({
      where: {
        token: req.cookies.at,
      },
    });
    if (isRevocated) throw new UnauthorizedException('invalid token');
    return this.authService.getData(req.user['id']);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.refreshTokens(req.user['id'], req.cookies.rt);
    this.authService.setCookie(res, token);
    return res.status(HttpStatus.OK).send();
  }
}
