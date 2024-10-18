import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notes";
import userRouter from "./routes/user";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validate";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://takenoteapp.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Ensure credentials are sent with cross-origin requests
}));

app.options('*', cors()); // Handle preflight requests




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

app.use("/api/users", userRouter);
app.use("/api/notes", requiresAuth, notesRouter);

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
