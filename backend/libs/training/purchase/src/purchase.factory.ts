import { EntityFactory, Purchase } from "@backend/shared-core";
import { PurchaseEntity } from "./purchase.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PurchaseFactory implements EntityFactory<PurchaseEntity> {
  create(entityPlainData: Purchase): PurchaseEntity {
    return new PurchaseEntity(entityPlainData);
  }
}
