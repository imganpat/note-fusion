import express from "express";
import notesController from "../controllers/notes-controller.js";
import isAuthenticated from "../middlewares/auth-middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, notesController.getAllNotes)

router.get("/:uid", notesController.getOneNote)

router.post("/add", isAuthenticated, notesController.addNewNote)

router.put("/imp/:uid", isAuthenticated, notesController.toggleImportance)

router.put("/complete/:uid", isAuthenticated, notesController.toggleCompletion)

router.put("/edit/:uid", isAuthenticated, notesController.editDesc)

router.delete("/delete/:uid", isAuthenticated, notesController.deleteNote)

export default router;