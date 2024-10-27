import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TokenBlacklistRepository } from 'libs/data-access/repository';
import { Model } from 'mongoose';

@Injectable()
export class TokenBlacklistService {
  constructor(private tokenBlacklistRepository: TokenBlacklistRepository) {}

  async addToken(token: string): Promise<void> {
    await this.tokenBlacklistRepository.create({ token });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenDoc = await this.tokenBlacklistRepository.findOne({ token });
    return !!tokenDoc;
  }

  async removeExpiredTokens(): Promise<void> {
    await this.tokenBlacklistRepository.deleteMany({
      expiresAt: { $lt: new Date() },
    });
  }
}
