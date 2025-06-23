import { Request, Response } from "express";
import { registerUser } from "../usecases/registerUser";
import { loginUser } from "../usecases/loginUser";
import { mongoUserRepository } from "../gateways/MongoUserRepository";

export async function registerController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    await registerUser(email, password, mongoUserRepository);
    res.status(201).json({ message: "User registered." });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password, mongoUserRepository);
    res.json({ token });
  } catch (e: any) {
    res.status(401).json({ error: e.message });
  }
}
