import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { SignupService } from '../services/signup.service';
import { SignupDto } from '../dtos/signup.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly loginService: LoginService,
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.signupService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
