import { Role } from "../settings/user.setting";

export interface Friend {
  id: string;
  name: string;
  location: string;
  trainTypes: string[];
  avatar: string;
  role: Role;
  trainingRequests: boolean;
}
