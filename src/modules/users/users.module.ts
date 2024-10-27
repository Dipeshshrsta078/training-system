import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import {
  SkillRepository,
  TokenBlacklistRepository,
  UsersRepository,
} from 'libs/data-access/repository';
import { providers } from './providers';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        };
      },
    }),
  ],
  controllers: [UsersController],
  providers: providers,
})
export class UsersModule {}
