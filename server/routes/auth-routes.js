import express from "express";
import authController from "../controllers/auth-controller.js";
import signUpSchema from "../validators/auth-validator.js";
import validate from "../middlewares/validate-middelware.js";

const router = express.Router();

router.post("/login", authController.loginPost);

router.post("/register", validate(signUpSchema), authController.registerPost);

router.get("/logout", authController.logout);

export default router;