import { EntityFactory, TrainingBalance } from "@backend/shared-core";
import { Injectable } from "@nestjs/common";
import { TrainingBalanceEntity } from "./training-balance.entity";

@Injectable()
export class TrainingBalanceFactory implements EntityFactory<TrainingBalanceEntity> {
  create(entityPlainData: TrainingBalance): TrainingBalanceEntity {
    return new TrainingBalanceEntity(entityPlainData);
  }
}
