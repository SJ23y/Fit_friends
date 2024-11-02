import { PaginationResult, PaymentType } from "@backend/shared-core";
import { PurchaseQuery } from "./purchase.query";
import { PurchaseRepository } from "./purchase.repository";
import { PurchaseEntity } from "./purchase.entity";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreatePurchaseDto } from "./dto/create-purchase.dto";
import { ReduceTrainingsDto } from "./dto/reduce-trainings.dto";

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository
  ) {}

  public async createPurchase(dto: CreatePurchaseDto, userId?: string): Promise<PurchaseEntity> {
    const purchase = {
      ...dto,
      userId: userId ?? '',
      totalPrice: dto.trainCount * dto.price,
      paymentType: dto.paymentType as PaymentType
    }

    const newPurchase = new PurchaseEntity(purchase)
    await this.purchaseRepository.save(newPurchase);

    return newPurchase;
  }

  public async getUserPurchases(userId?: string, query?: PurchaseQuery):  Promise<PaginationResult<PurchaseEntity>> {
    const paginationResult =  await this.purchaseRepository.getPurchasesByUserId(userId, query);

    return paginationResult;
  }

  public async getTrainingPurchase(purchaseId: string, userId?: string):  Promise<PurchaseEntity> {
    if (!userId) {
      throw new UnauthorizedException('Please, login to get this information');
    }

    const training =  await this.purchaseRepository.getTrainingPurchase(purchaseId, userId);

    if (! training) {
      throw new NotFoundException(`Purchase with id ${purchaseId} not found`);
    }

    return training;
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

    await this.purchaseRepository.changePurchaseTrainingsCount(currentPurchase);

    return currentPurchase;
  }


}
