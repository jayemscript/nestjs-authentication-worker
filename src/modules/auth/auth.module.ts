import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '../jwt.module';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [JwtModule, UsersModule, SessionsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
