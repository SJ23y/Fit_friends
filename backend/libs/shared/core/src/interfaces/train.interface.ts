import { TRAIN_TYPES, TrainDuration } from "../setting/train.setting";
import { Gender, UserLevel } from "../setting/user.setting";

export interface Train {
  id?: string;
  title: string;
  image: string;
  level: UserLevel;
  type: typeof TRAIN_TYPES;
  duration: TrainDuration;
  price: number;
  callorieNumber: number;
  description: string;
  gender: Gender,
  video: string;
  rate: number;
  coach: string;
  isSpecialOffer: boolean;
}
