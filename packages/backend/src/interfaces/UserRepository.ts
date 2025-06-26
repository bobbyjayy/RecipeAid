import { User } from "../entities/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: {
    email: string;
    password: string;
    verified: boolean;
  }): Promise<User>;
}
