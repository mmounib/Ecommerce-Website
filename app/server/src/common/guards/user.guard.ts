import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: { message: string }) {
    if (!err && !user && info)
      throw new UnauthorizedException('user not found');
    return user;
  }
}