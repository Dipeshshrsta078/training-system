import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'libs/data-access/repository';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private tokenBlacklistService: TokenBlacklistService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string; profile: string }> {
    // Validate the user credentials
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    // Create the payload for the JWT token
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      profile: user.profile,
    };

    // Sign and return the JWT token
    const token = this.jwtService.sign(payload);
    const isBlacklisted =
      await this.tokenBlacklistService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Invalid token');
    }
    return {
      token,
      profile: user.profile,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return user;
    }
    return null;
  }

  async logout(
    token: string,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      if (!token) {
        throw new UnauthorizedException('Unauthorized user');
      }
      const headerToken = token.split(' ')[1];
      const payload = this.jwtService.decode(headerToken) as { exp: number };
      if (payload) {
        await this.tokenBlacklistService.addToken(token);
      }
      return { statusCode: 200, message: 'Logout success' };
    } catch (e) {
      console.log(e);
    }
  }
}
