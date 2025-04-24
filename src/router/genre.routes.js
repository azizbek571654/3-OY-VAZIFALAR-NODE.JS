import { Router } from "express";
import { genreController } from "../controller/genres.controller.js";

const genrerouter = Router();
const conteroller = new genreController();

genrerouter
    .post("/", conteroller.createGenres)
    .get("/", conteroller.getAllGenres)
    .get("/:id", conteroller.getGenresById)
    .patch("/:id", conteroller.updateGenresById)
    .delete("/:id", conteroller.deleteGenresById)

export default genrerouter