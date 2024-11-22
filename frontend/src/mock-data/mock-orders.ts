import { faker } from "@faker-js/faker";
import { Order } from "../types/purchase";
import { getRandomInteger } from "../utils";

export function generateMockOrders(): Order {
    return {
      id: faker.string.uuid(),
      type: faker.lorem.words(3),
      price: getRandomInteger(1, 1000),
      trainTotalPrice: getRandomInteger(1, 1000),
      trainTotalCount: getRandomInteger(1, 1000),
      coachId: faker.string.uuid(),
      trainingId: faker.string.uuid(),
      image: faker.lorem.words(3),
      callorieQuantity: getRandomInteger(1000, 5000),
      rate: getRandomInteger(1, 5),
      title: faker.lorem.words(3),
      description: faker.lorem.words(3),
      createdAt: faker.date.recent()
  }
}
