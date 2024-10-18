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
  id: 'undefined',
  userId: 'undefined',
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
  id: 'undefined',
  userId: 'undefined',
  createdAt: new Date(),
  updatedAt: new Date(),
  userLevel: UserLevel.AMATEUR,
  trainType: TRAIN_TYPES,
  trainDuration: TrainDuration.MEDIUM,
  calorieGoal: 3300,
  caloriePerDay: 200,
  isReadyForTrain: true
}
