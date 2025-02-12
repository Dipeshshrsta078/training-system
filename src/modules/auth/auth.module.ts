import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from 'libs/data-access/repository';
import { TokenBlacklistModule } from '../token-blacklist/token-blacklist.module';
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
    TokenBlacklistModule,
  ],
  controllers: [AuthController],
  providers: providers,
})
export class AuthModule {}
