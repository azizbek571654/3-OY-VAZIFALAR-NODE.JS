import { Genre } from '../model/index.js';
import { catchError } from '../utils/index.js';
import { genresValidator } from '../validation/index.js';

export class genreController {
  async createGenres(req, res) {
    try {
      const { error, value } = genresValidator(req.body);
      if (error) {
        catchError(res, 400, error);
      }
      const { name } = value;
      const newGenre = await Genre.create({
        name,
      });
      return res.status(201).json({
        StatusCode: 201,
        message: 'succsess',
        data: newGenre,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async getAllGenres(req, res) {
    try {
      const genre = await Genre.find();
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: genre,
      });
    } catch (error) {
      catchError(res, 404, 'genre not found');
    }
  }

  async getGenresById(req, res) {
    try {
      const id = req.params.id;
      const genre = await Genre.findById(id);
      if (!genre) {
        catchError(res, 404, 'genre not found');
      }

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: genre,
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async updateGenresById(req, res) {
    try {
      const id = req.params.id;
      const genre = await Genre.findById(id);
      if (!genre) {
        catchError(res, 404, 'genre not found');
      }
      const updatedgenre = await Genre.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: { updatedgenre },
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }

  async deleteGenresById(req, res) {
    try {
      const id = req.params.id;
      const genre = await Genre.findById(id);
      if (!genre) {
        catchError(res, 404, 'genre not found');
      }
      await Genre.findByIdAndDelete(id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {},
      });
    } catch (error) {
      catchError(res, 500, error.message);
    }
  }
}
