import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized " });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    // Attach user info to request if needed, e.g. req.user = payload;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
}
