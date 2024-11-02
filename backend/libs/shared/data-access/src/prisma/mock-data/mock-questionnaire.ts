// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  TRAIN_TYPES,
  TrainDuration,
  UserLevel,
  UserQuestionnarie,
  MAX_CALLORIES_COUNT,
  MIN_CALLORIES_COUNT,
  CoachQuestionnarie
} from "../../../../core/src/index";
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getRandomInteger, getRanndomElement } from '../../../../helpers/src/common'
import { faker } from "@faker-js/faker";

export function generateMockUserQuestionnaire(): UserQuestionnarie {
  return {
    userLevel: getRanndomElement(Object.values(UserLevel)),
    trainType: [getRanndomElement(TRAIN_TYPES)],
    trainDuration: getRanndomElement(Object.values(TrainDuration)),
    calorieGoal: MAX_CALLORIES_COUNT,
    caloriePerDay: getRandomInteger(MIN_CALLORIES_COUNT, (MAX_CALLORIES_COUNT - 1000)),
    isReadyForTrain: faker.datatype.boolean(0.5)
  }
}

export function generateMockCoachQuestionnaire(): CoachQuestionnarie {
  return {
    userLevel: getRanndomElement(Object.values(UserLevel)),
    trainType: [getRanndomElement(TRAIN_TYPES)],
    description: faker.lorem.words(5),
    individualTraining: faker.datatype.boolean(0.5)
  }
}
