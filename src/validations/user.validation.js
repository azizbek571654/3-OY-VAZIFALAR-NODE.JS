import z from "zod";

export const userSchema = {
  update: z.object({
    full_name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(5).max(15).optional(),
  }),
};
