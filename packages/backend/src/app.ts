import express from "express";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

export default app;
