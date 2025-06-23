import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../interfaces/UserRepository";
import { User } from "../entities/User";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables.");
}

export async function loginUser(
  email: string,
  password: string,
  userRepo: UserRepository
): Promise<string> {
  // Find user by email
  const user = (await userRepo.findByEmail(email)) as User | null;
  if (!user) throw new Error("Invalid credentials");

  // compare password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  // create jwt token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
}
