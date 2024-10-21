import { UserData } from "./auth";

export type Review = {
  id: string;
  author?: UserData;
  userId: string;
  trainId: string;
  rate: number;
  content: string;
  createdAt: string;
}

export type Reviews = Review[];

export type NewReview = Pick<Review, 'content' | 'rate' | 'trainId'>
