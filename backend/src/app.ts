import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notes";
import userRouter from "./routes/user"
import morgan from "morgan";
import "dotenv/config";
import cors from 'cors';
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validate"
import MongoStore from "connect-mongo"

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
  secret: env.SESSION_SECREAT,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTING_STRING,
  })
}));

app.use("/api/users", userRouter)
app.use("/api/notes", notesRouter);


app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unkown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
