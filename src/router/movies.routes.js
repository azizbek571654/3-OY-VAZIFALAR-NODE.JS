import { Router } from "express";
import { moviesController } from "../controller/index.js";
// import { SelfGuard, jwtAuthDuard } from "../middleware/index.js";
const moviesrouter = Router();
const conteroller = new moviesController();

moviesrouter
  .post("/", conteroller.createMovies)
  .get("/", conteroller.getAllMovies)
  .get("/:id", conteroller.getAllMoviesById)
  .patch("/:id", conteroller.updateMoviesById)
  .delete("/:id", conteroller.deleteMoviesById);
  
  // .get("/:id", jwtAuthDuard, SelfGuard, conteroller.getAllMoviesById)
  // .patch("/:id", jwtAuthDuard, SelfGuard, conteroller.updateMoviesById)
  // .delete("/:id", jwtAuthDuard, SelfGuard, conteroller.deleteMoviesById);

export default moviesrouter