import { PaymentType } from '../setting/common.setting';

export interface Purchase {
  type: string;
  train: string;
  price: number;
  trainCount: number;
  totalPrice: number;
  paymentType: PaymentType;
  createdAt: string;
}
