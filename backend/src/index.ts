import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Sales Portal API (TS Version)" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
