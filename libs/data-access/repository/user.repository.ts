import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }
}
