import {
  SkillRepository,
  TokenBlacklistRepository,
  UsersRepository,
} from 'libs/data-access/repository';
import { UsersService } from './users.service';

export const providers = [
  UsersService,
  UsersRepository,
  SkillRepository,
  TokenBlacklistRepository,
];
