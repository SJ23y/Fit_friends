import { faker } from "@faker-js/faker";
import { getRandomInteger, getRanndomElement } from "../utils";
import { TRAIN_TYPES, TrainDuration, UserLevel } from "../consts";
import { CoachQuestionnaire, UserQuestionnaire } from "../types/auth";

export function generateMockUserQuestionnaire(): UserQuestionnaire {
  return {
    userLevel: getRanndomElement(Object.values(UserLevel)),
    trainType: [getRanndomElement(TRAIN_TYPES)],
    trainDuration: getRanndomElement(Object.values(TrainDuration)),
    calorieGoal: 5000,
    caloriePerDay: getRandomInteger(1000, (5000)),
    isReadyForTrain: faker.datatype.boolean(0.5)
  }
}

export function generateMockCoachQuestionnaire(): CoachQuestionnaire {
  return {
    userLevel: getRanndomElement(Object.values(UserLevel)),
    trainType: [getRanndomElement(TRAIN_TYPES)],
    description: faker.lorem.words(5),
    individualTraining: faker.datatype.boolean(0.5)
  }
}
