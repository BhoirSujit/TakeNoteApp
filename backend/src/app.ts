import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/notes.js";
import userRouter from "./routes/user.js";
import morgan from "morgan";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validate.js";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import path from "path";



const app = express();

// Use cookies
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: env.SESSION_SECREAT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTING_STRING,
    }),
  })
);

app.use("/api/users", userRouter);
app.use("/api/notes", requiresAuth, notesRouter);



const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  console.log("front end path : ",path.join(__dirname, "../../frontend/dist"));


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });  
}



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
