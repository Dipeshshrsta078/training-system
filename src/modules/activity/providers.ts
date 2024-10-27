import {
  ActivityRepository,
  SkillRepository,
  TokenBlacklistRepository,
  UsersRepository,
} from 'libs/data-access/repository';
import { ActivityService } from './activity.service';

export const providers = [
  ActivityService,
  ActivityRepository,
  UsersRepository,
  SkillRepository,
  TokenBlacklistRepository,
];
