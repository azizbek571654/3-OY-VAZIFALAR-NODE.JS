import { Router } from "express";
import { moviesController } from "../controller/movies.controller.js";

const moviesrouter = Router();
const conteroller = new moviesController();

moviesrouter
  .post("/", conteroller.createMovies)
  .get("/", conteroller.getAllMovies)
  .get("/:id", conteroller.getAllMoviesById)
  .patch("/:id", conteroller.updateMoviesById)
  .delete("/:id", conteroller.deleteMoviesById);

export default moviesrouter