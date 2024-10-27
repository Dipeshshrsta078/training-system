import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.authService.login(loginDto);
    return res
      .status(HttpStatus.OK)
      .json({ token: user.token, profile: user.profile });
  }
  @Get('/logout')
  async logout(@Query('token') token: string, @Res() res) {
    try {
      const result = await this.authService.logout(token);
      return res.status(HttpStatus.OK).json({ message: 'Logout success' });
    } catch (e) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Unauthorized user' });
    }
  }
}
