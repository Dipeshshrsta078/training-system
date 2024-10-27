import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../schema';
import { BaseRepository } from './base.repository';

@Injectable()
export class SkillRepository extends BaseRepository {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {
    super(skillModel);
  }
}
