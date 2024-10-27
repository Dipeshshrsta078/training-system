import { Module } from '@nestjs/common';
import { TokenBlacklistService } from './token-blacklist.service';
import { TokenBlacklistRepository } from 'libs/data-access/repository';

@Module({
  providers: [TokenBlacklistService, TokenBlacklistRepository],
  exports: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
