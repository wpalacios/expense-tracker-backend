import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid email or password' };
  }

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string }) {
    const user = await this.authService.register(
      registerDto.email,
      registerDto.password,
    );
    return { message: 'User registered successfully', user };
  }
}
