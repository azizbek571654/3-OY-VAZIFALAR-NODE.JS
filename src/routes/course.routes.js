import { Router } from 'express';
import {
  courseController,
  enrollmentController,
} from '../controller/INDEX.controller.js';
import { jwtAuthDuard, AdminGuard } from '../middleware/INDEX.guard.js';

const CourseRouter = Router();
const conteroller = new courseController();
const conterollerE = new enrollmentController();

CourseRouter.post(
  '/:id/enroll',
  jwtAuthDuard,
  AdminGuard,
  conterollerE.createEnrollment
)
  .post('/', jwtAuthDuard, AdminGuard, conteroller.createCourse)
  .get('/', conteroller.getAllCourse)
  .get('/:id', conteroller.getCourseById)
  .patch('/:id', jwtAuthDuard, AdminGuard, conteroller.UpdateCourseById)
  .delete('/:id', jwtAuthDuard, AdminGuard, conteroller.deleteCourseById);

export default CourseRouter;
