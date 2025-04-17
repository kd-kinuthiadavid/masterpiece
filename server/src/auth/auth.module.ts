import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { SignupService } from './services/signup.service';
import { LoginService } from './services/login.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [SignupService, LoginService],
})
export class AuthModule {}
