import { faker } from '@faker-js/faker';
import { getRandomInteger, getRanndomElement } from '../utils';
import { Gender, TRAIN_TYPES, TrainDuration, UserLevel } from '../consts';
import { Training } from '../types/trainings';
import { generateMockUser } from './mock-users';

export function generateMockTraining(): Training {
  return {
    id: faker.string.ulid(),
    createdAt: faker.date.recent(),
    coach: generateMockUser(),
    title: faker.lorem.sentence(3),
    image: faker.system.fileName(),
    level: getRanndomElement(Object.values(UserLevel)),
    type: getRanndomElement(TRAIN_TYPES),
    duration: getRanndomElement(Object.values(TrainDuration)),
    price: getRandomInteger(0, 10000),
    callorieQuantity: getRandomInteger(1000, 5000),
    description: faker.lorem.sentences(3),
    gender: getRanndomElement(Object.values(Gender)),
    rate: '0',
    video: faker.system.fileName(),
    coachId: faker.person.fullName(),
    isSpecialOffer: faker.datatype.boolean()
  }
}
