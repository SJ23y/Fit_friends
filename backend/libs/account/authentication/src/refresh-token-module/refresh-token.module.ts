import { Module } from '@nestjs/common';
import { RefreshTokenFactory } from './refresh-token.factory';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';
import { PrismaClientModule } from '@backend/data-access';

@Module({
  imports: [PrismaClientModule],
  providers: [
    RefreshTokenFactory,
    RefreshTokenRepository,
    RefreshTokenService
  ],
  exports: [
    RefreshTokenService
  ]
})
export class RefreshTokenModule {}
