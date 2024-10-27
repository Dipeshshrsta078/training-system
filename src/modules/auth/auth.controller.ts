import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return { token: user.token, profile: user.profile };
  }
  @Get('/logout')
  async logout(@Query('token') token: string) {
    const result = await this.authService.logout(token);
    return result;
  }
}
