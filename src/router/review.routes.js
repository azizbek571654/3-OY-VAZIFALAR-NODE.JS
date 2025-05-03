import { Router } from 'express';
import { reviewController } from '../controller/index.js';
// import { SelfGuard, jwtAuthDuard } from "../middleware/index.js";

const reviewrouter = Router();
const conteroller = new reviewController();

reviewrouter
  .post('/', conteroller.createReviews)
  .get('/', conteroller.getAllreviews)
  .get('/:id', conteroller.getreviewsById)
  .patch('/:id', conteroller.updatereviewsById)
  .delete('/:id', conteroller.deletereviewsById);

//   .get("/:id", jwtAuthDuard, SelfGuard, conteroller.getreviewsById)
//   .patch("/:id", jwtAuthDuard, SelfGuard, conteroller.updatereviewsById)
//   .delete("/:id", jwtAuthDuard, SelfGuard, conteroller.deletereviewsById);

export default reviewrouter;
