import express from "express";
import authController from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/login", authController.loginPost);

router.post("/register", authController.registerPost);

router.get("/logout", authController.logout);

export default router;