import { PaginationResult } from "@backend/shared-core";
import { ReviewQuery } from "./review.query";
import { ReviewRepository } from "./review.repository";
import { ReviewEntity } from "./review.entity";
import { Injectable } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) {}

  public async createReview(dto: CreateReviewDto, userId?: string):  Promise<ReviewEntity> {
    const review = {
      ...dto,
      userId: userId ?? ''
    }

    const newReviewEntity = new ReviewEntity(review);
    await this.reviewRepository.save(newReviewEntity);

    return newReviewEntity;
  }

  public async getAllTrainingReviews(trainingId: string, query?: ReviewQuery): Promise<PaginationResult<ReviewEntity>> {
    return await this.reviewRepository.getReviewsByTrainingId(trainingId, query);
  }
}
