import { faker } from "@faker-js/faker";
import { getRandomInteger, getRanndomElement } from "../utils";
import { PaymentType } from "../consts";
import { Purchase } from "../types/purchase";


export function generateMockPurchase(): Purchase {
  return {
    type: 'абонемент',
    trainId: faker.string.uuid(),
    userId: faker.string.uuid(),
    price: getRandomInteger(0, 5000),
    trainCount: getRandomInteger(1, 50),
    totalPrice: getRandomInteger(1, 50),
    paymentType: getRanndomElement(Object.values(PaymentType)),
    remainingTrainings: 1,
    id: faker.string.uuid(),
    createdAt: faker.date.recent()
  }
}
