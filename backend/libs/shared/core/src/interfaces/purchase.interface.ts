import { PaymentType } from '../settings/common.setting';

export interface Purchase {
  id?: string;
  type: string;
  trainId: string;
  userId: string;
  price: number;
  trainCount: number;
  totalPrice: number;
  paymentType: PaymentType;
  createdAt?: Date;
}
