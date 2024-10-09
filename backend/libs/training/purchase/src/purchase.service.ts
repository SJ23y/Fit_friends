import { PaginationResult, PaymentType } from "@backend/shared-core";
import { PurchaseQuery } from "./purchase.query";
import { PurchaseRepository } from "./purchase.repository";
import { PurchaseEntity } from "./purchase.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { ReduceTrainingsDto } from "./dto/reduce-trainings.dto";
import { TrainingBalanceService } from "@backend/user-balance";

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly trainingBalanceService: TrainingBalanceService
  ) {}

  public async createPurchase(dto: CreatePurchaseDto, userId?: string): Promise<PurchaseEntity> {
    const purchase = {
      ...dto,
      userId: userId ?? '',
      totalPrice: dto.trainCount * dto.price,
      paymentType: dto.paymentType as PaymentType
    }

    const newPurchase = new PurchaseEntity(purchase)
    await Promise.all([
      this.purchaseRepository.save(newPurchase),
      this.trainingBalanceService.addTrainingsToBalance({
        userId: userId ?? '',
        trainingId: dto.trainId,
        trainingCount: dto.trainCount
      })
    ]);

    return newPurchase;
  }

  public async getUserPurchases(userId?: string, query?: PurchaseQuery):  Promise<PaginationResult<PurchaseEntity>> {
    const paginationResult =  await this.purchaseRepository.getPurchasesByUserId(userId, query);

    return paginationResult;
  }

  public async getTrainingCount(purchaseId: string):  Promise<number> {
    const trainingCount =  await this.purchaseRepository.getPurchaseTrainingsCount(purchaseId);

    if (! trainingCount) {
      throw new NotFoundException(`Purchase with id ${purchaseId} not found`);
    }

    return trainingCount;
  }

  public async reduceTrainingsCount(purchaseId: string, dto: ReduceTrainingsDto, userId?: string):  Promise<PurchaseEntity> {
    const currentPurchase = await this.purchaseRepository.getPurchaseById(purchaseId);

    if (! currentPurchase) {
      throw new NotFoundException(`Purchase with id ${purchaseId} not found`);
    }

    if (currentPurchase.trainId !== dto.trainId) {
      throw new BadRequestException(`Wrong training ID`);
    }

    if (currentPurchase.trainCount < dto.trainCount) {
      throw new BadRequestException(`You don't have enough trainings to withdraw`);
    }

    currentPurchase.trainCount -= dto.trainCount;

    await Promise.all([
      this.purchaseRepository.changePurchaseTrainingsCount(currentPurchase),
      this.trainingBalanceService.reduceTrainingBalance({
       userId: userId ?? '',
       trainingId: dto.trainId,
       trainingCount: dto.trainCount
     })
   ]);

    return currentPurchase;
  }


}
