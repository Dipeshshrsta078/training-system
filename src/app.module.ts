import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'libs/data-access/data-access.module';
import { TokenBlacklistModule } from './modules/token-blacklist/token-blacklist.module';
import { ActivityModule } from './modules/activity/activity.module';
import { UsersModule } from './modules/users/users.module';
import { SkillModule } from './modules/skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    DatabaseModule,
    ActivityModule,
    UsersModule,
    TokenBlacklistModule,
    SkillModule,
  ],
  // controllers: [AppController],
})
export class AppModule {}
