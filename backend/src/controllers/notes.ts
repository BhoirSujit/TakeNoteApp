import { NextFunction, RequestHandler, Response, Request } from "express";
import NoteModel from "../models/note.js";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { asserisDefined } from "../util/asserisDefined.js";

export const getNotes: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;

  try {
    asserisDefined(authenticatedUserId);

    const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;

  try {
    asserisDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not found");

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot access this note");

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    asserisDefined(authenticatedUserId);
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }

    const newNote = await NoteModel.create({
      userId: authenticatedUserId,
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParam {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParam,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  const authenticatedUserId = req.session.userId;

  try {
    asserisDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note id");

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not found");

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot access this note");

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

interface DeleteNoteParam {
  noteId: string;
}

export const deleteNote: RequestHandler<
  DeleteNoteParam,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const authenticatedUserId = req.session.userId;
  try {
    asserisDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(400, "Invalid note id");

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not found");

    if (!note.userId.equals(authenticatedUserId))
      throw createHttpError(401, "You cannot access this note");

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
