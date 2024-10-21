import { UserLevel } from '../settings/user.setting';

export interface UserQuestionnarie {
  userLevel: UserLevel;
  trainType: string[];
  trainDuration: string;
  calorieGoal: number;
  caloriePerDay: number;
  isReadyForTrain: boolean;
}
