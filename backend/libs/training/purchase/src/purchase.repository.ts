import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { PurchaseEntity } from './purchase.entity';
import { PurchaseFactory } from './purchase.factory';
import {  Prisma, Purchase as PrismaPurchase } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PurchaseQuery } from './purchase.query';
import { DEFAULT_PAGE_NUMBER, MAX_PURCHASE_COUNT_LIMIT, PaginationResult, SortBy } from '@backend/shared-core';

@Injectable()
export class PurchaseRepository extends BasePostgresRepository<PurchaseEntity, PrismaPurchase> {
  constructor(
    private readonly PurchaseFactory: PurchaseFactory,
    private readonly client: PrismaClientService
  ) {
    super(PurchaseFactory);
  }

  public async save(purchase: PurchaseEntity): Promise<void> {
    const purchaseObj = purchase.toPOJO();
    const newPurchase = await this.client.purchase.create({
      data: {
        type: purchaseObj.type,
        price: purchaseObj.price,
        trainCount: purchaseObj.trainCount,
        totalPrice: purchaseObj.totalPrice,
        paymentType: purchaseObj.paymentType,
        train: {
          connect: {
              id: purchase.trainId
          }
        },
        user: {
          connect: {
            id: purchase.userId
          }
        },
      }
    });
    purchase.id = newPurchase.id;
  }

  public async getPurchaseById(purchaseId: string): Promise<PurchaseEntity | null> {
    const purchase = await this.client.purchase.findFirst({
      where: {id: purchaseId}
    });

    if (!purchase) {
      return null;
    }

    return this.createEntityFromDocument(purchase);
  }

  public async getTrainingPurchase(trainingId: string, userId: string): Promise<PurchaseEntity | null> {
    const purchases = await this.client.purchase.findMany({
      where: {trainId: trainingId, userId },
      orderBy: {trainCount: 'desc'}
    });

    if (purchases.length === 0) {
      return null;
    }

    return this.createEntityFromDocument(purchases[0]);
  }

  public async changePurchaseTrainingsCount(purchase: PurchaseEntity): Promise<void> {
    const purchaseObj = purchase.toPOJO();
    const updatedPurchase = await this.client.purchase.update({
      where: {id: purchase.id},
      data: {
        type: purchaseObj.type,
        price: purchaseObj.price,
        trainCount: purchaseObj.trainCount,
        totalPrice: purchaseObj.totalPrice,
        paymentType: purchaseObj.paymentType
      }
    });

    if (!updatedPurchase) {
      throw new NotFoundException(`Purchase with id ${purchase.id} not found`);
    }
  }

  public async getPurchasesByUserId(userId?: string, query?: PurchaseQuery): Promise<PaginationResult<PurchaseEntity>> {
    const take = (query?.count && query.count < MAX_PURCHASE_COUNT_LIMIT) ? query.count : MAX_PURCHASE_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.PurchaseWhereInput = {userId: userId ?? ''};
    const orderBy: Prisma.PurchaseOrderByWithRelationInput = {};

    console.log('purchase sortBy', query?.sortBy);
    if (query?.sortBy) {
      switch (query.sortBy) {
        case SortBy.DATE:
          orderBy.createdAt = query.sortDirection;
          break;
        case SortBy.TRAININGS_COUNT:
          orderBy.trainCount = query.sortDirection;
          break;
        case SortBy.TOTAL_PRICE:
          orderBy.totalPrice = query.sortDirection;
          break;
      }
      if (query?.filterBy) {
        where.trainCount = {gt: 0}
      }
    }
    console.log('orderBy', orderBy)

    const [purchasesCount, userPurchaces] = await Promise.all([
      this.client.purchase.count({where}),
      this.client.purchase.findMany({where, take, skip, orderBy, include: {train: true}})
    ]);


    return {
      entities: userPurchaces.map((purchase) => this.createEntityFromDocument(purchase)),
      totalItems: purchasesCount,
      totalPages: Math.ceil(purchasesCount / take),
      currentPage: query?.page ?? DEFAULT_PAGE_NUMBER,
      itemsPerPage: take
    }
  }
}
