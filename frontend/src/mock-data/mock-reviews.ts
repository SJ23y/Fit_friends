import { faker } from "@faker-js/faker";
import { getRandomInteger } from "../utils";
import { Review } from "../types/review";


export function generateMockReview(): Review {
  return {
    userId: faker.string.uuid(),
    trainId: faker.string.uuid(),
    rate: getRandomInteger(1,5),
    content: faker.lorem.sentences(3),
    id: faker.string.uuid(),
    createdAt: faker.date.recent().toISOString()
  }
}
