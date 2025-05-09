import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

export const transport = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'azizbekmirzavaliyev31@gmail.com',
    pass: 'kfulmnhuplwmgsiz',
  },
  secure: true,
});
