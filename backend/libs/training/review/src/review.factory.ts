import { EntityFactory, Review } from "@backend/shared-core";
import { ReviewEntity } from "./review.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewFactory implements EntityFactory<ReviewEntity> {
  create(entityPlainData: Review): ReviewEntity {
    return new ReviewEntity(entityPlainData);
  }
}
