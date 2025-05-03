import { Router } from 'express';
import { userController } from '../controller/index.js';
// import { SelfGuard, jwtAuthDuard } from "../middleware/index.js";
const userrouter = Router();
const conteroller = new userController();

userrouter
  .post('/', conteroller.createUser)
  .get('/', conteroller.getAllUsers)
  .get('/:id', conteroller.getUserById)
  .patch('/:id', conteroller.updateUserById)
  .delete('/:id', conteroller.deleteUserById);

// .get("/:id", jwtAuthDuard, SelfGuard, conteroller.getUserById)
// .patch("/:id", jwtAuthDuard, SelfGuard, conteroller.updateUserById)
// .delete("/:id", jwtAuthDuard, SelfGuard, conteroller.deleteUserById);

export default userrouter;
