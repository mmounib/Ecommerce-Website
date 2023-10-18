import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { GetUser, GetUserId } from '../common/decoratores';
import { AtGuard, RtGuard } from '../common/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @SetMetadata('isPublic', true)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: LoginDto) {
    return this.authService.signin(dto);
  }

  // @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Get('')
  async getData(@GetUserId() userId: number) {
    return this.authService.getData(userId);
  }

  @SetMetadata('isPublic', true)
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetUserId() userId: number,
    @GetUser('refreshToken') rt: string,
  ) {
    return this.authService.refreshTokens(userId, rt);
  }
}
