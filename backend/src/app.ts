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

app.use(
  cors({
    origin: ["https://takenoteapp.onrender.com", "http://localhost:5173/"], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization", "userId"], // Explicitly allow these headers
  })
);





app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECREAT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    
      httpOnly: true, // Prevent access from JavaScript (security best practice)
      sameSite: "none", // Required for cross-origin cookies
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTING_STRING,
    }),
  })
);

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
