import { model, Schema } from 'mongoose';

const courseSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Course = model('Course', courseSchema);
