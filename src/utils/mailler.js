import nodemailer from "nodemailer"
import { config} from "dotenv";
config();

export const transport = nodemailer.createTransport({
  // port: Number(process.env.SMTP_PORT),
  port: 465,
  // host: process.env.SMTP_HOST,
  host: "smtp.gmail.com",
  auth: {
    // user: process.env.SMTP_USER,
    user: "azizbekmirzavaliyev31@gmail.com",
    // password: process.env.SMTP_PASS,
    pass: 'kfulmnhuplwmgsiz',
  },
  secure: true,
});