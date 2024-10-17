import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import { compare, hash } from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password)
      throw createHttpError(400, "Parameter missing");

    const existingUserName = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUserName)
      throw createHttpError(
        409,
        "Username already taken, Please choose a different one log in insted."
      );

    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail)
      throw createHttpError(
        409,
        "A user with this address already exists. Please log in insted"
      );

    const passwordHashed = await hash(password, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LogInBody {
  username?: string;
  password?: string;
}

export const logIn: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      throw createHttpError(400, "Parameters missing");

    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) throw createHttpError(401, "Invalid credential");

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw createHttpError(401, "Invalid password");

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
