import { Gender } from '../settings/user.setting';

export interface User {
  id?: string;
  name:  string;
  email: string;
  avatar: string;
  gender: Gender;
  birthDate: string;
  description: string;
  location: string;
  backgroundImage: string;
  createdAt?: Date;
  questionnaire?: string;
}
