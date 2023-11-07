import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class sessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  serializeUser(user: {id: string, email: string}, done: Function) {
    done(null, user.id);
  }
  async deserializeUser(payload: {id: string, email: string}, done: Function) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    return user ? done(null, user) : done(null, null);
  }
}
