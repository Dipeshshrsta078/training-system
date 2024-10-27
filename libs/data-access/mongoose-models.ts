import {
  User,
  UserSchema,
  Activity,
  ActivitySchema,
  TokenBlacklist,
  TokenBlacklistSchema,
  Skill,
  SkillSchema,
} from './schema';

export const mongooseModels = [
  { name: Activity.name, schema: ActivitySchema },
  { name: User.name, schema: UserSchema },
  { name: TokenBlacklist.name, schema: TokenBlacklistSchema },
  { name: Skill.name, schema: SkillSchema },
];
