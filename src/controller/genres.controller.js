import { Genre } from "../model/index.js";
import { catchError } from "../utils/index.js";
import { genresValidator } from "../validation/index.js";


export class genreController {
    async createGenres(req, res){
        try {
            const { error, value } = genresValidator(req.body);
            if (error) {
              throw new Error(`'Error on careating : ${error}`);
            }
            const { name } = value;
            const newGenre = await Genre.create({
                name
            });
            return res.status(201).json({
              StatusCode: 201,
              message: "succsess",
              data: newGenre,
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    
    async getAllGenres(req, res){
        try {
            const genre = await Genre.find();
            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: genre,
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    
    async getGenresById(req, res){
        try {
            const id = req.params.id;
            const genre = await Genre.findById(id)
            if (!genre) {
                throw new Error("genre not found");   
            }

            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: genre,
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    
    async updateGenresById(req, res){
        try {
            const id = req.params.id;
            const genre = await Genre.findById(id)
            if (!genre) {
                throw new Error("genre not found");
            }

            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: {},
            });
        } catch (error) {
            catchError(error, res)
        }
    }
    
    async deleteGenresById(req, res){
        try {
            const id = req.params.id;
            const genre = await Genre.findById(id);
            if (!genre) {
                throw new Error("genre not found");
            }
            await Genre.findByIdAndDelete(id)
            return res.status(200).json({
              statusCode: 200,
              message: "success",
              data: {},
            });
        } catch (error) {
            catchError(error, res)
        }
    }
}
