import { Router } from 'express';
import { genreController } from '../controller/index.js';
// import { SelfGuard, jwtAuthDuard } from "../middleware/index.js";

const genrerouter = Router();
const conteroller = new genreController();

genrerouter
  .post('/', conteroller.createGenres)
  .get('/', conteroller.getAllGenres)
  .get('/:id', conteroller.getGenresById)
  .patch('/:id', conteroller.updateGenresById)
  .delete('/:id', conteroller.deleteGenresById);

// .get("/:id", jwtAuthDuard, SelfGuard, conteroller.getGenresById)
// .patch("/:id", jwtAuthDuard, SelfGuard, conteroller.updateGenresById)
// .delete("/:id", jwtAuthDuard, SelfGuard, conteroller.deleteGenresById);

export default genrerouter;
