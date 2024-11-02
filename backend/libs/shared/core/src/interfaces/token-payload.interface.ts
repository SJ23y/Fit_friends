import { Role } from "../settings/user.setting";

export interface TokenPayload {
  sub: string;
  name: string;
  role: Role;
}
