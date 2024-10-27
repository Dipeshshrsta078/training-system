import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenBlacklistRepository } from 'libs/data-access/repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokenBlacklistRepo: TokenBlacklistRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];
    console.log('token', token);
    if (!token) {
      throw new UnauthorizedException('Unauthorized user');
    }
    const blackListedToken = await this.tokenBlacklistRepo.find({
      token: token,
    });
    if (blackListedToken.length > 0) {
      throw new UnauthorizedException('Token expired');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }
}
