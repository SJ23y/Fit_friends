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
  train?: Training
}

export type Purchases = Purchase[];

export type NewPurchase = Pick<Purchase, 'price' | 'trainId' | 'paymentType' | 'trainCount' | 'type'>;
