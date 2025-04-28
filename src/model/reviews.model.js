import mongoose from "mongoose";
import { collections } from "../common/db.js";

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.user,
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.movies,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
});

export const Reviews = mongoose.model(collections.reviews, reviewSchema);
