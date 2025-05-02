import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';
import {
  jwtAuthDuard,
  SupperAdminGuard,
  AdminGuard,
  SelfGuard,
} from '../middleware/index.Guard.js';

const UserRouter = Router();
const conteroller = new UserController();

UserRouter.post('/supperadmin', conteroller.createSupperAdmin)
  .post('/', jwtAuthDuard, AdminGuard, conteroller.createUser)
  .post('/signin', conteroller.siginUser)
  .post('/confim-signin', conteroller.confimSiginUser)
  .post('/signout', jwtAuthDuard, conteroller.signoutAdmin)
  .post('/token', conteroller.accessToken)
  .get('/', jwtAuthDuard, SupperAdminGuard, conteroller.getAllAdmins)
  .get('/:id', jwtAuthDuard, SelfGuard, conteroller.getAdminById)
  .patch('/:id', jwtAuthDuard, SelfGuard, conteroller.updateAdminById)
  .delete('/:id', jwtAuthDuard, SupperAdminGuard, conteroller.deleteAdminById);

export default UserRouter;
