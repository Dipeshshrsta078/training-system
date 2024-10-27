import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { SkillRepository, UsersRepository } from 'libs/data-access/repository';

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
  providers: [UsersService, UsersRepository, SkillRepository],
})
export class UsersModule {}
