import { TrainDuration } from '../settings/train.setting';
import { Gender, UserLevel } from '../settings/user.setting';

export interface Training {
  id?: string;
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
  rate: number;
  coach: string;
  isSpecialOffer: boolean;
  createdAt?: Date;
}
