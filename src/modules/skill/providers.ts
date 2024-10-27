import {
  SkillRepository,
  TokenBlacklistRepository,
} from 'libs/data-access/repository';
import { SkillService } from './skill.service';

export const providers = [
  SkillService,
  SkillRepository,
  TokenBlacklistRepository,
];
