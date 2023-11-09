import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUser(@Req() req: Request) {
    if (!req.user) return null;
    return await this.userService.getUser(req.user['id']);
  }
}
