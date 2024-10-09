import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseFactory } from './purchase.factory';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';
import { AuthenticationModule } from '@backend/authentication';
import { TrainingBalanceModule } from '@backend/user-balance';

@Module({
  imports: [
    AuthenticationModule,
    TrainingBalanceModule
  ],
  controllers: [PurchaseController],
  providers: [
    PurchaseFactory,
    PurchaseRepository,
    PurchaseService
  ],
  exports: [PurchaseService],
})
export class PurchaseModule {}
