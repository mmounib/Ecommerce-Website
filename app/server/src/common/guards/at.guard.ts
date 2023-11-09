import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any, info: { message: string }) {
    if (!err && !user && info) {
      if (info.message === 'No auth token') throw new UnauthorizedException('expired token');
      throw new UnauthorizedException('invalid token');
    }
    return user;
  }
}
