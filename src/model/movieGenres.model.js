import mongoose from 'mongoose';
import { collections } from '../common/db.js';

const movieGenreSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.movies,
    required: true,
  },
  genre_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.genres,
    required: true,
  },
});

export const MovieGenres = mongoose.model(
  collections.movie_Genres,
  movieGenreSchema
);
