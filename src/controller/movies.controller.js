import { Movies } from "../model/index.js";
import { catchError } from "../utils/index.js";
import { moviesValidator } from "../validation/index.js";

export class moviesController {
    async createMovies(req, res){
        try {
            const { error, value } = moviesValidator(req.body);
            // console.log(value);

            if (error) {
              throw new Error(`'Error on careating : ${error}`);
            }
            const {title, genre, comments} = value

            const newmovies = await Movies.create({
              title,
              genre,
              comments,
            });

            return res.status(201).json({
              StatusCode: 201,
              message: "succsess",
              data: newmovies,
            });
        } catch (error) {
            catchError(error, res)
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
            catchError(error, res)
        }
    }

    async getAllMoviesById(req, res){
        try {
            const id = req.params.id;
            const movies = await Movies.findById(id)
            if (!movies) {
                throw new Error("movies not found");   
            }

            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: movies,
            });
        } catch (error) {
            catchError(error, res)
        }
    }

    async updateMoviesById(req, res){
        try {
            const id = req.params.id;
            const movies = await Movies.findById(id)
            if (!movies) {
                throw new Error("movies not found");
            }
            await Movies.findByIdAndDelete(id)
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {}
            });
        } catch (error) {
            catchError(error, res)
        }
    }

    async deleteMoviesById(req, res){
        try {
            const id = req.params.id;
            const movies = await Movies.findById(id);
            if (!movies) {
                throw new Error("movies not found");
            }
            await Movies.findByIdAndDelete(id)
            return res.status(200).json({
                statusCode: 200,
                message: "success",
                data: {}
            });
        } catch (error) {
            catchError(error, res)
        }
    }
}