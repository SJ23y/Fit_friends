export const MAX_CALLORIES_COUNT = 5000;
export const MIN_CALLORIES_COUNT = 1000;

import { TRAIN_TYPES, TrainDuration } from "./train.setting";

export const LOCATIONS = ['Пионерская', 'Петроградская', 'Удельная', 'Звёздная', 'Спортивная'];

export enum UserLevel {
  PRO = 'профессионал',
  AMATEUR = 'любитель',
  NEWBIE = 'новичок'
};

export enum Gender {
  MALE =  'мужской',
  FEMALE = 'женский',
  NONE = 'неважно'
};

export enum Role {
  USER =  'user',
  COACH = 'coach'
};

export const DefaultQuestionnaireWoman = {
  createdAt: new Date(),
  updatedAt: new Date(),
  userLevel: UserLevel.AMATEUR,
  trainType: TRAIN_TYPES,
  trainDuration: TrainDuration.MEDIUM,
  calorieGoal: 2300,
  caloriePerDay: 200,
  isReadyForTrain: true
}

export const DefaultQuestionnaireMan = {
  createdAt: new Date(),
  updatedAt: new Date(),
  userLevel: UserLevel.AMATEUR,
  trainType: TRAIN_TYPES,
  trainDuration: TrainDuration.MEDIUM,
  calorieGoal: 3300,
  caloriePerDay: 200,
  isReadyForTrain: true
}

export const MAX_USER_COUNT_LIMIT = 50;
export const USER_SLIDER_COUNT_LIMIT = 8;
