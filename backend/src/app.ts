import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notes";
import morgan from "morgan";
import "dotenv/config";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRouter);

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unkown error occured";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
