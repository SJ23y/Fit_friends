import { BasePostgresRepository, PrismaClientService } from '@backend/data-access';
import { ReviewEntity } from './review.entity';
import { DEFAULT_PAGE_NUMBER, MAX_REVIEW_COUNT_LIMIT, PaginationResult, SortBy } from '@backend/shared-core';
import { ReviewFactory } from './review.factory';
import { ReviewQuery } from './review.query';
import { Prisma, Review as PrismaReview } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository extends BasePostgresRepository<ReviewEntity, PrismaReview> {
  constructor(
    private readonly ReviewFactory: ReviewFactory,
    private readonly client: PrismaClientService
  ) {
    super(ReviewFactory);
  }

  public async save(reviewEntity: ReviewEntity): Promise<void> {
    const review = reviewEntity.toPOJO();
    const newReview = await this.client.review.create({
      data: {
        content: review.content,
        rate: review.rate,
        author: {
          connect: {
            id: review.userId
          }
        },
        train: {
          connect: {
            id: review.trainId
          }
        }
      },
      include: {
        author: true
      }
    });

    reviewEntity.id = newReview.id;
    reviewEntity.author = newReview.author;
  }

  private async getReviewsCount(where: Prisma.ReviewWhereInput): Promise<number> {
    return await this.client.review.count({ where })
  }

  public async getReviewsByTrainingId(trainingId: string, query?: ReviewQuery): Promise<PaginationResult<ReviewEntity>> {
    const take = (query?.count && query.count < MAX_REVIEW_COUNT_LIMIT) ? query.count : MAX_REVIEW_COUNT_LIMIT;
    const skip = (query?.page && query?.count) ? (query.page - 1) * query.count : undefined;
    const where: Prisma.ReviewWhereInput = { trainId: trainingId};
    const orderBy: Prisma.ReviewOrderByWithRelationInput = {};

    if (query?.sortBy === SortBy.DATE) {
      orderBy.createdAt = query.sortDirection
    }

    const [Reviews, ReviewsCount] = await Promise.all([
      this.client.review.findMany({take, skip, where, orderBy, include: {author: true}}),
      this.getReviewsCount(where)
    ]);


    return {
      entities: Reviews.map((review) => this.createEntityFromDocument(review)),
      totalItems: ReviewsCount,
      currentPage: query?.page ?? DEFAULT_PAGE_NUMBER,
      totalPages: Math.ceil(ReviewsCount/take),
      itemsPerPage: take
    }
  }
}
