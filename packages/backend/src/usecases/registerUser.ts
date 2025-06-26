import bcrypt from "bcryptjs";
import { UserRepository } from "../interfaces/UserRepository";
// import { sendVerificationEmail } from "../gateways/emailGateway";

export async function registerUser(
  email: string,
  password: string,
  userRepo: UserRepository
) {
  // check if user exists
  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User already exists");

  // hash password and create user
  const hash = await bcrypt.hash(password, 10);

  const newUser = await userRepo.create({
    email,
    password: hash,
    verified: false,
  });

  // TODO: set up email verification
  // await sendVerificationEmail(newUser.email);

  // return {
  //   message: "Registration successful. Please check your email to verify.",
  // };
}
