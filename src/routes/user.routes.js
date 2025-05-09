import { Router } from 'express';
import { UserController } from '../controller/INDEX.controller.js';
import {
  jwtAuthDuard,
  SupperAdminGuard,
  AdminGuard,
  SelfGuard,
} from '../middleware/INDEX.guard.js';

const UserRouter = Router();
const conteroller = new UserController();

UserRouter.post('/supperadmin', conteroller.createSupperAdmin)
  .post(
    '/auth/register',
    jwtAuthDuard,
    SupperAdminGuard,
    conteroller.createUser
  )
  .post('/auth/register/t', jwtAuthDuard, AdminGuard, conteroller.createUser)
  .post('/auth/login', conteroller.siginUser)
  .post('/confim-signin', conteroller.confimSiginUser)
  .post('/auth/logout', jwtAuthDuard, conteroller.signoutuser)
  .post('/token', conteroller.accessToken)
  .get('/', jwtAuthDuard, AdminGuard, conteroller.getAllusers)
  .get('/:id', jwtAuthDuard, SelfGuard, conteroller.getuserById)
  .patch('/:id', jwtAuthDuard, AdminGuard, conteroller.updateuserById)
  .delete('/:id', jwtAuthDuard, SupperAdminGuard, conteroller.deleteuserById);

export default UserRouter;
