import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, GoogleStrategy, RtStrategy, sessionSerializer } from './strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AtStrategy, RtStrategy, GoogleStrategy, sessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
