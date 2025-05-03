import mongoose from 'mongoose';
import { collections } from '../common/db.js';
const moviesschema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: true,
  },
  genre: {
    type: String,
    trim: true,
    require: true,
  },
  comments: {
    type: String,
    trim: true,
    require: true,
  },
});

export const Movies = mongoose.model(collections.movies, moviesschema);
