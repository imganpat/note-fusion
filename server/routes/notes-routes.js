import express from "express";
import notesController from "../controllers/notes-controller.js"

const router = express.Router();

router.get("/", notesController.getAllNotes)

router.post("/add", notesController.addNewNote)

router.put("/imp/:uid", notesController.toogleImportance)

router.put("/complete/:uid", notesController.toogleCompletion)

router.put("/edit/:uid", notesController.editDesc)

router.delete("/delete/:uid", notesController.deleteNote)

export default router;