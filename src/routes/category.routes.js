import { Router } from 'express';
import { categoryController } from '../controller/INDEX.controller.js';
import { jwtAuthDuard, AdminGuard } from '../middleware/INDEX.guard.js';

const CategoryRouter = Router();
const conteroller = new categoryController();

CategoryRouter.post('/', conteroller.createCategory)
  .get('/', conteroller.getAllCategories)
  .get('/:id', conteroller.getCategoryById)
  .patch('/:id', jwtAuthDuard, AdminGuard, conteroller.updateCategoryById)
  .delete('/:id', jwtAuthDuard, AdminGuard, conteroller.deleteCategoryById);

export default CategoryRouter;
