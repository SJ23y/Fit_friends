import { Entity, Review, StorableEntity } from '@backend/shared-core';
import { User } from '@prisma/client';

export class ReviewEntity extends Entity implements StorableEntity<Review> {
  public author?: User;
  public trainId: string;
  public userId: string;
  public rate: number;
  public content: string;
  public createdAt?: string;

  constructor(review?: Review) {
    super();

    this.populate(review);
  }

  private populate(review?: Review) {
    if (review) {
    this.id = review.id ?? '';
    this.rate = review.rate;
    this.trainId = review.trainId;
    this.userId = review.userId;
    this.content =  review.content;
    this.createdAt = review.createdAt;
    this.author = review.author;
    }
  }

  public toPOJO(): Review {
    return {
      id: (this.id) ? this.id : undefined,
      trainId: this.trainId,
      userId: this.userId,
      rate: this.rate,
      content: this.content,
      createdAt: this.createdAt,
      author: this.author
    }
  }
}
