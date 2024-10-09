import { User } from "@prisma/client";

export interface Review {
  id?: string;
  author?: User;
  userId: string;
  trainId: string;
  rate: number;
  content: string;
  createdAt?: string;
}
