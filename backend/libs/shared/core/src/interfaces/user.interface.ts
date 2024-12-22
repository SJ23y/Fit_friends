import { Gender, Role } from '../settings/user.setting';
import { Review, Training, Purchase, Friend, Request, Subscription } from '@prisma/client';
import { CoachQuestionnarie, UserQuestionnarie } from './questionnarie.interface';

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
  questionnaire?: UserQuestionnarie | CoachQuestionnarie;
  role: Role;
  reviews?: Review[];
  trainings?: Training[];
  purchases?: Purchase[];
  friends?: Friend[];
  requests?: Request[];
  recievedRequests?: Request[];
  subscriptions?: Subscription[];
  sertificates?: string[];
}
