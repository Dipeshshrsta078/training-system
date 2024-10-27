import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenBlacklist, TokenBlacklistDocument } from '../schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class TokenBlacklistRepository extends BaseRepository {
  constructor(
    @InjectModel(TokenBlacklist.name)
    private userModel: Model<TokenBlacklistDocument>,
  ) {
    super(userModel);
  }
}
