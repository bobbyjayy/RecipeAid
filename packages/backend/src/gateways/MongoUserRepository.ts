import { UserRepository } from "../interfaces/UserRepository";
import UserModel from "../models/UserModel";
import { User } from "../entities/User";

export const mongoUserRepository: UserRepository = {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  },
  async create(user: { email: string; password: string }): Promise<User> {
    return UserModel.create(user);
  },
};
