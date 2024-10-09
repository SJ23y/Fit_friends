import { EntityFactory, Training } from "@backend/shared-core";
import { TrainingEntity } from "./training.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  create(entityPlainData: Training): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }
}
