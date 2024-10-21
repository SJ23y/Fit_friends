import { Gender, TrainDuration, UserLevel } from "../consts";

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
  coach: string;
  isSpecialOffer: boolean;
  createdAt: Date;
}

export type Trainings = Training[];
