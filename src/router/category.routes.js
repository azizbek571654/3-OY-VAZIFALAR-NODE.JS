import express from "express";
import { categoryController } from "../controllers/index.js";
// import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
// import { categorySchema } from "../validations/category.validation.js";

const router = express.Router();

router
  .post("/", authMiddleware, categoryController.create)
  .get("/", authMiddleware, categoryController.findAll)
  .get("/:id", authMiddleware, categoryController.findOne)
  .put("/:id", authMiddleware, categoryController.update)
  .delete("/:id", authMiddleware, categoryController.delete);

export { router as categoryrouter };