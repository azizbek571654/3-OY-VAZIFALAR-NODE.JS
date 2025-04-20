import express from "express"
import { userController } from "../controllers/index.js"
import { authMiddleware } from "../middlewares/user.middleware.js"
import { authController } from "../controllers/index.js"

const router = express.Router()

router
    .get("/", authMiddleware, userController.getall)
    .post("/", authMiddleware, userController.create)
    .get("/:id", userController.getone)
    .post("/", authMiddleware, authController.register)
    .put("/:id", userController.update)
    .delete("/:id", userController.delete)

export {router as userRouter}