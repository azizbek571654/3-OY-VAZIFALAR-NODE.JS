import { model, Schema } from 'mongoose';
const userScheme = new Schema(
  {
    full_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'teacher', 'student'],
      default: 'student',
      required: false,
    },
  },
  { timestamps: true }
);

export const User = model('User', userScheme);
