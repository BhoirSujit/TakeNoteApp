import { createNote, getNote, getNotes } from "../controllers/notes";
import { Router } from "express";


const router = Router();

router.get("/", getNotes );
router.get("/:noteId", getNote);
router.post("/", createNote);


export default router;