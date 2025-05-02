import express from 'express';
import { config } from 'dotenv';
import { connectionDB } from './db/index.js';
import cookieParser from 'cookie-parser';
import UserRouter from './router/user.routes.js';
import CourseRoutes from './router/course.routes.js';

config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
await connectionDB();

app.use('/course', CourseRoutes);
app.use('/user', UserRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost/${PORT}`);
});
