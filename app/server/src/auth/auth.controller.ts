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
import { AtGuard, GoogleGuard, RtGuard } from '../common/guards';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) throw new UnauthorizedException('invalid token');
    const [accessToken, refreshToken] = await Promise.all([
      this.authService.newAccessToken(req.user['id'], req.user['email']),
      this.authService.newRefreshToken(req.user['id'], req.user['email']),
    ]);
    await this.authService.updateRtHash(req.user['id'], refreshToken);
    this.authService.setCookies(res, { accessToken, refreshToken });
    return res.redirect('http://localhost:5173/'); 
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    const response = await this.authService.signup(dto, res);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: LoginDto, @Res() res: Response) {
    const response = await this.authService.signin(dto, res);
    return res.status(HttpStatus.CREATED).send(response);
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
