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
import { Request, Response, response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

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
    return this.authService.logout(req.user['sub'], req.cookies.at);
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
    return this.authService.getData(req.user['sub']);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.refreshTokens(
      req.user['sub'],
      req.cookies.rt,
    );
    this.authService.setCookie(res, token);
    return res.status(HttpStatus.OK).send();
  }
}
