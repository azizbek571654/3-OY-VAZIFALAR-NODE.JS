import express from "express";
import { authController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();


router.post("/login", authController.login)
router.post("/register", authController.register);

export {router as authRouter}