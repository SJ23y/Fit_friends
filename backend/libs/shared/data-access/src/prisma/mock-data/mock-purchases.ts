// eslint-disable-next-line @nx/enforce-module-boundaries
import { PaymentType, Purchase } from "../../../../core/src/index";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRandomInteger, getRanndomElement } from '../../../../helpers/src/common'

export function generateMockPurchase(): Purchase {
  return {
    type: 'абонемент',
    trainId: '',
    userId: '',
    price: getRandomInteger(0, 5000),
    trainCount: getRandomInteger(1, 50),
    totalPrice: 0,
    paymentType: getRanndomElement(Object.values(PaymentType))

  }
}
