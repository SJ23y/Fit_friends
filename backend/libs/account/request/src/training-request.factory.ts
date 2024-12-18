import { EntityFactory,  RequestForTraining } from "@backend/shared-core";
import { Injectable } from "@nestjs/common";
import { TrainingRequestEntity } from "./training-request.entity";

@Injectable()
export class TrainingRequestFactory implements EntityFactory<TrainingRequestEntity> {
  public create(entityPlainData: RequestForTraining): TrainingRequestEntity {
    return new TrainingRequestEntity(entityPlainData);
  }
}
