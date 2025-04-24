import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const userrouter = Router();
const conteroller = new userController();


userrouter
  .post("/", conteroller.createUser)
  .get("/", conteroller.getAllUsers)
  .get("/:id", conteroller.getUserById)
  .patch("/:id", conteroller.updateUserById)
  .delete("/:id", conteroller.deleteUserById)

export default userrouter;