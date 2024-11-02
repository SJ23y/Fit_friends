import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseFactory } from './purchase.factory';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseService } from './purchase.service';
import { AuthenticationModule } from '@backend/authentication';
import { TrainingModule } from '@backend/training';

@Module({
  imports: [
    AuthenticationModule,
    TrainingModule
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
