// eslint-disable-next-line @nx/enforce-module-boundaries
import { DEFAULT_TRAIN_IMAGE_NAMES, DEFAULT_VIDEO_NAMES, Gender, TRAIN_TYPES, TrainDuration, Training, UserLevel } from "../../../../core/src/index";
import { faker } from '@faker-js/faker';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRandomInteger, getRanndomElement } from '../../../../helpers/src/common'

export function generateMockTraining(): Training {
  return {
    title: faker.lorem.sentence(3),
    image: getRanndomElement(DEFAULT_TRAIN_IMAGE_NAMES),
    level: getRanndomElement(Object.values(UserLevel)),
    type: getRanndomElement(TRAIN_TYPES),
    duration: getRanndomElement(Object.values(TrainDuration)),
    price: getRandomInteger(0, 10000),
    callorieQuantity: getRandomInteger(1000, 5000),
    description: faker.lorem.sentences(3),
    gender: getRanndomElement(Object.values(Gender)),
    rate: 0,
    video: getRanndomElement(DEFAULT_VIDEO_NAMES),
    coachId: faker.person.fullName(),
    isSpecialOffer: faker.datatype.boolean()
  }
}
