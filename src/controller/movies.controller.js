import { Movies } from "../model/index.js";
import { catchError } from "../utils/index.js";
import { moviesValidator } from "../validation/index.js";

export class moviesController {
    async createMovies(req, res){
        try {
            const { error, value } = moviesValidator(req.body);

            if (error) {
              catchError(res, 400, error);
            }
            const {title, movies, comments} = value

            const newmovies = await Movies.create({
              title,
              movies,
              comments,
            });

            return res.status(201).json({
              StatusCode: 201,
              message: "succsess",
              data: newmovies,
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async getAllMovies(req, res){
        try {
            const movies = await Movies.find();
            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: movies,
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async getAllMoviesById(req, res){
        try {
            const id = req.params.id;
            const movies = await Movies.findById(id)
            if (!movies) {
                catchError(res, 404, "movies not found");   
            }

            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: movies,
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async updateMoviesById(req, res){
        try {
            const id = req.params.id;
            const movies = await Movies.findById(id)
            if (!movies) {
                catchError(res, 404, "movies not found");
            }
            await Movies.findByIdAndUpdate(id)
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {}
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async deleteMoviesById(req, res){
        try {
            const id = req.params.id;
            const movies = await Movies.findById(id);
            if (!movies) {
                catchError(res, 404, "movies not found");
            }
            await Movies.findByIdAndDelete(id)
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {}
            });
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}