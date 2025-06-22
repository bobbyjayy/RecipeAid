import UserModel from "../models/UserModel";

export const userRepository = {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  },
  async create(user: { email: string; password: string }) {
    return UserModel.create(user);
  },
};
