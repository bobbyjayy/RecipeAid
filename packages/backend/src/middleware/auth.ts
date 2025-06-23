import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // store auth header ("Bearer (token string)")
  const authHeader = req.headers.authorization;
  // check if token exist, if not then error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized " });
    return;
  }

  // get just the token string
  const token = authHeader.split(" ")[1];
  try {
    // verify token and return decoded content
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    // attach user info to request
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
}
