import { PaymentType } from "../consts";
import { Training } from "./trainings";

export type Purchase = {
  id: string;
  type: string;
  trainId: string;
  userId: string;
  price: number;
  trainCount: number;
  totalPrice: number;
  paymentType: PaymentType;
  createdAt: Date;
  train?: Training,
  remainingTrainings?: number
}

export type Order = {
  id: string;
  type: string;
  price: number;
  trainTotalPrice: number;
  trainTotalCount: number;
  coachId: string;
  trainingId: string;
  image: string;
  callorieQuantity: number;
  rate: number;
  title: string;
  description: string;
  createdAt: Date;
}

export type Purchases = Purchase[];

export type NewPurchase = Pick<Purchase, 'price' | 'trainId' | 'paymentType' | 'trainCount' | 'type'>;
