import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AtGuard, UserGuard } from 'src/common/guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(UserGuard)
  @Get('')
  async getUser(@Req() req: Request) {
    if (!req.user) return null;
    return await this.userService.getUser(req.user['id']);
  }

  @UseGuards(AtGuard)
  @Get('wishList')
  async getWishList(@Req() req: Request) {
    return await this.userService.getWishList(req.user['id']);
  }

  @UseGuards(AtGuard)
  @Post('addToFavList/:id')
  async addToFavList(@Param('id') productId: string, @Req() req: Request) {
    return await this.userService.addToFavList(req.user['id'], productId)
  }
}
