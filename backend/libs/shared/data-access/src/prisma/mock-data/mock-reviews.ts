// eslint-disable-next-line @nx/enforce-module-boundaries
import { Review } from "../../../../core/src/index";
import { faker } from '@faker-js/faker';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRandomInteger } from '../../../../helpers/src/common'

export function generateMockReview(): Review {
  return {
    userId: '',
    trainId: '',
    rate: getRandomInteger(1,5),
    content: faker.lorem.sentences(3)
  }
}
