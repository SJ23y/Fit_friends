// eslint-disable-next-line @nx/enforce-module-boundaries
import { Gender, TRAIN_TYPES, TrainDuration, Training, UserLevel } from "../../../../core/src/index";
import { faker } from '@faker-js/faker';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRandomInteger, getRanndomElement } from '../../../../helpers/src/common'

export function generateMockTraining(): Training {
  return {
    title: faker.lorem.sentence(3),
    image: `${faker.system.fileName({extensionCount: 1})}.${faker.system.fileExt('image/jpeg')}`,
    level: getRanndomElement(Object.values(UserLevel)),
    type: getRanndomElement(TRAIN_TYPES),
    duration: getRanndomElement(Object.values(TrainDuration)),
    price: getRandomInteger(0, 10000),
    callorieQuantity: getRandomInteger(1000, 5000),
    description: faker.lorem.sentences(3),
    gender: getRanndomElement(Object.values(Gender)),
    rate: 0,
    video: `${faker.system.fileName({extensionCount: 1})}.${faker.system.fileExt('video/mp4')}`,
    coach: faker.person.fullName(),
    isSpecialOffer: faker.datatype.boolean()
  }
}
