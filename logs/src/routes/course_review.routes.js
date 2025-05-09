import { Router } from 'express';
import { courseReviewController } from '../controller/INDEX.controller.js';
import { jwtAuthDuard, AdminGuard } from '../middleware/INDEX.guard.js';

const CourseReviewRouter = Router();
const conteroller = new courseReviewController();

CourseReviewRouter.post('/', jwtAuthDuard, conteroller.createReview)
  .get('/', jwtAuthDuard, AdminGuard, conteroller.getAllReviews)
  .get('/:id', conteroller.getReviewById)
  .patch('/:id', jwtAuthDuard,  conteroller.updateReviewById)
  .delete('/:id', jwtAuthDuard, conteroller.deleteReviewById);

export default CourseReviewRouter;
