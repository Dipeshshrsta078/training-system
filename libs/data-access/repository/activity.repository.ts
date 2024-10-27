import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from '../schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class ActivityRepository extends BaseRepository {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {
    super(activityModel);
  }
}
