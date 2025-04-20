import { orderController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { Router } from "express";

export const orderRouter = Router();

orderRouter
  .post("/", authMiddleware, orderController.create)
  .get("/", authMiddleware, orderController.findAll)
  .get("/:id", authMiddleware, orderController.findOne)
  .put("/:id", authMiddleware, orderController.update)
  .delete("/:id", authMiddleware, orderController.delete);