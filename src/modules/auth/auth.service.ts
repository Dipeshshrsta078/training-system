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

  // Method to authenticate user and return JWT token
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
      token, // Return the signed token
      profile: user.profile, // Include the user's profile in the response
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    // Find the user by username
    const user = await this.userRepository.findOne({ username });

    // Check if the user exists and password matches (assuming password is hashed)
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (bcrypt.compare(password, user.password)) {
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
      const payload = this.jwtService.decode(token) as { exp: number };
      if (payload && payload.exp) {
        await this.tokenBlacklistService.addToken(
          token,
          payload.exp - Math.floor(Date.now() / 1000),
        );
      }
      return { statusCode: 200, message: 'Logout success' };
    } catch (e) {
      console.log(e);
    }
  }
}
