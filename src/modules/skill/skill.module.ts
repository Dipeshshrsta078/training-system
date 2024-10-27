import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { SkillRepository } from 'libs/data-access/repository';

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
  controllers: [SkillController],
  providers: [SkillService, SkillRepository],
})
export class SkillModule {}
