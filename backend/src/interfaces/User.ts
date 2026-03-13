import { Role } from "../constants/roles.js";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  avatarUrl?: string;
}
