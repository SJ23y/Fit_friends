import { Gender, TrainDuration, UserLevel } from "../consts";
import { UserData } from "./auth";

export type Training = {
  id: string;
  title: string;
  image: string;
  level: UserLevel;
  type: string;
  duration: TrainDuration;
  price: number;
  callorieQuantity: number;
  description: string;
  gender: Gender;
  video: string;
  rate: string;
  coach: UserData;
  coachId: string;
  isSpecialOffer: boolean;
  createdAt: Date;
}

export type UpdateTraining = {
  title?: string;
  description?: string;
  video?: string;
  isSpecialOffer?: boolean;
  price?: number;
}

export type Trainings = Training[];
