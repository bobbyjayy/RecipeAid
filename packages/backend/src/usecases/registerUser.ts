import bcrypt from "bcryptjs";
import { UserRepository } from "../interfaces/UserRepository";

export async function registerUser(
  email: string,
  password: string,
  userRepo: UserRepository
) {
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User already exists");
  const hash = await bcrypt.hash(password, 10);
  await userRepo.create({ email, password: hash });
}
