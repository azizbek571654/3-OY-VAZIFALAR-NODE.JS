import { Router } from 'express';
import { enrollmentController } from '../controller/INDEX.controller.js';
import { jwtAuthDuard, AdminGuard } from '../middleware/INDEX.guard.js';

const EnrollmentRouter = Router();
const controller = new enrollmentController();

EnrollmentRouter.get('/', controller.getAllEnrollments)
  .get('/:id', controller.getEnrollmentById)
  .patch('/:id', jwtAuthDuard, AdminGuard, controller.updateEnrollmentById)
  .delete('/:id', jwtAuthDuard, AdminGuard, controller.deleteEnrollmentById);

export default EnrollmentRouter;
