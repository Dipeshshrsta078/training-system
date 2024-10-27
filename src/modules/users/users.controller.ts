import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/user.role.guard';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('v1/user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @UseGuards(AuthGuard)
  async register(@Body() registerDto: RegisterDto, @Req() req: Request) {
    const userRole = req.user.profile;
    const result = await this.usersService.register(registerDto, userRole);
    return result;
  }
}
