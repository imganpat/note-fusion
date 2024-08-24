import express from "express";
import notesController from "../controllers/notes-controller.js"

const router = express.Router();

router.get("/", notesController.getAllNotes)

router.get("/imp", notesController.getImpNotes)

router.post("/add", notesController.addNewNote)

router.put("/imp/:uid", notesController.markImportant)

router.put("/complete/:uid", notesController.markComplete)

router.put("/edit/:uid", notesController.editDesc)

router.delete("/delete/:uid", notesController.deleteNote)

export default router;