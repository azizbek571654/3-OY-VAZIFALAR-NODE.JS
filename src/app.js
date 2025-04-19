import express from "express";
import {
  authRouter,
  userRouter,
  productRouter,
  categoryrouter,
  orderRouter,
} from "./router/index.js";
import { errorHandler } from "./middlewares/errrorhandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/order", orderRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryrouter);



app.use(errorHandler)

export default app