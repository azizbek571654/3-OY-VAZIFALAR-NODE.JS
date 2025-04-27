import mongoose from 'mongoose';
import { collections } from "../common/db.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },

    email: {
      type: String,
      trim: true,
      require: true,
    },
    hashedPassword: { type: String, required: true },
  },
  { timestamps: true }
);


export const User = mongoose.model(collections.user, userSchema);