import express from 'express';
import { config } from 'dotenv';
import { connectionDB } from './db/db.js';
import UserRouter from './routes/user.routes.js';
import CourseRouter from './routes/course.routes.js';
import EnrollmentRouter from './routes/enrollment.routes.js';
import CategoryRouter from './routes/category.routes.js';
import CourseReviewRouter from './routes/course_review.routes.js';
import cookieParser from 'cookie-parser';
import logger from './utils/logger/logger.js';
config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
await connectionDB();

app.use('/review', CourseReviewRouter);
app.use('/category', CategoryRouter);
app.use('/enroll', EnrollmentRouter);
app.use('/course', CourseRouter);
app.use('/user', UserRouter);

process.on('uncaughtException', (err) => {
  if (err) console.log(`Uncauth exception ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reasion, promise) => {
  console.log(`Unhandled rejection ${reasion}`);
});

app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Internal server error' });
  } else {
    return next();
  }
});

app.listen(
  PORT,
  logger.info(`✅ server runnig on port http://localhost:${PORT} `)
);
