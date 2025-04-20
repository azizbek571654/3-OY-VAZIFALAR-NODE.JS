import mongoose from "mongoose";
import z from "zod";

export const productSchema = {
  create: z.object({
    name: z.string().min(3).max(100),
    price: z.number().min(0),
    description: z.string().min(0),
    stock: z.number().min(0),
    category: z.string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }),
  }),
  update: z.object({
    name: z.string().min(3).max(100).optional(),
    price: z.number().min(0).optional(),
    description: z.string().optional(),
    stock: z.number().min(0).optional(),
    category: z
      .string()
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .optional(),
  }),
};
