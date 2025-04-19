import express from "express";
import { productController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, productController.getall);
router.get("/:id", authMiddleware, productController.getone);
router.post("/", authMiddleware, productController.create);
router.put("/:id", authMiddleware, productController.update);
router.delete("/:id", authMiddleware, productController.delete);

export { router as productRouter };
