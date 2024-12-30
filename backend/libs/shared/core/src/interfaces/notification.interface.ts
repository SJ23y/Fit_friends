import { User } from "./user.interface";

export interface Notification {
  id?: string;
  createdAt?: Date;
  text: string;
  user?: User;
  userId?: string;
}
