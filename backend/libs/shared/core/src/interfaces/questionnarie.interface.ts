import { UserLevel } from '../settings/user.setting';

export interface UserQuestionnarie {
  userLevel: UserLevel;
  trainType: string[];
  trainDuration: string;
  calorieGoal: number;
  caloriePerDay: number;
  isReadyForTrain: boolean;
}

export interface CoachQuestionnarie {
  userLevel: UserLevel;
  trainType: string[];
  description: string;
  individualTraining: boolean;
}
