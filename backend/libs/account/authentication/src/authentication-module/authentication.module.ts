import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@backend/user-config';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { LocalStartegy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
import { UserModule, UserRepository } from '@backend/user';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStartegy,
    JwtRefreshStrategy
  ],
})
export class AuthenticationModule {
  constructor(
    private readonly UserRepsitory: UserRepository
  ) {}
}
