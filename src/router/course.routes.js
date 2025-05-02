import { Router } from 'express';
import { courseController } from '../controller/course.controller.js';
import { jwtAuthDuard, AdminGuard } from '../middleware/index.Guard.js';
const CourseRoutes = Router();
const conteroller = new courseController();

CourseRoutes.post('/', jwtAuthDuard, AdminGuard, conteroller.createCourse)
  .get('/', jwtAuthDuard, AdminGuard, conteroller.getAllCourses)
  .get('/:id', conteroller.getcourseById)
  .patch('/:id', AdminGuard, conteroller.updatecourseById)
  .delete('/:id', jwtAuthDuard, AdminGuard, conteroller.deletecourseById);

export default CourseRoutes;
