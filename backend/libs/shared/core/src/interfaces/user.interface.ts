import { Gender, Role } from '../settings/user.setting';
import { Review, Training, Purchase} from '@prisma/client';
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
  role: Role;
  reviews?: Review[];
  trainings?: Training[];
  purchases?: Purchase[];
}
