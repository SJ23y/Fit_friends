import { RequestStatus } from "../settings/user.setting";
import { User } from "./user.interface"

export interface RequestForTraining {
  reciever: User;
  recieverId: string;
  sender: User;
  senderId: string;
  createdAt: Date;
  updatedAt: Date;
  status: RequestStatus;
}
