import * as NoteController from "../controllers/notes";
import { Router } from "express";

const router = Router();

router.get("/", NoteController.getNotes);
router.get("/:noteId", NoteController.getNote);
router.post("/", NoteController.createNote);
router.patch("/:noteId", NoteController.updateNote);
router.delete("/:noteId", NoteController.deleteNote);

export default router;
