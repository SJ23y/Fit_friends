import { Training } from '@prisma/client';
import { PaymentType } from '../settings/common.setting';

export interface Purchase {
  id?: string;
  type: string;
  trainId: string;
  userId: string;
  price: number;
  trainCount: number;
  remainingTrainings: number;
  totalPrice: number;
  paymentType: PaymentType;
  createdAt?: Date;
  train?: Training
}
