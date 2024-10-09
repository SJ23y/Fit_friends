import { Entity, PaymentType, Purchase, StorableEntity } from '@backend/shared-core';

export class PurchaseEntity extends Entity implements StorableEntity<Purchase> {
  public type: string;
  public trainId: string;
  public userId: string;
  public price: number;
  public trainCount: number;
  public totalPrice: number;
  public paymentType: PaymentType;
  public createdAt?: Date;

  constructor(purchase?: Purchase) {
    super();

    this.populate(purchase);
  }

  private populate(purchase?: Purchase) {
    if (purchase) {
    this.id = purchase.id ?? '';
    this.type = purchase.type;
    this.trainId = purchase.trainId;
    this.trainCount = purchase.trainCount;
    this.price =  purchase.price;
    this.totalPrice =  purchase.totalPrice;
    this.paymentType =  purchase.paymentType;
    this.createdAt = purchase.createdAt;
    this.userId = purchase.userId
    }
  }

  public toPOJO(): Purchase {
    return {
      id: (this.id) ? this.id : undefined,
      type: this.type,
      trainId: this.trainId,
      trainCount: this.trainCount,
      price: this.price,
      totalPrice: this.totalPrice,
      paymentType:  this.paymentType,
      createdAt: this.createdAt,
      userId: this.userId
    }
  }
}
