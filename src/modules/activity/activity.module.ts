import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import {
  ActivityRepository,
  SkillRepository,
  UsersRepository,
} from 'libs/data-access/repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ActivityRepository,
    UsersRepository,
    SkillRepository,
  ],
})
export class ActivityModule {}
