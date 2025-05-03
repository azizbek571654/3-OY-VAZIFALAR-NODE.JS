import mongoose from 'mongoose';
import { collections } from '../common/db.js';

const genreschema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
});

export const Genre = mongoose.model(collections.genres, genreschema);
