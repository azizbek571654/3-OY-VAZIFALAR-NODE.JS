import express from 'express';
import { config } from 'dotenv';
import { connectionDB } from './db/index.js';
import cookieParser from 'cookie-parser';
import logger from './utils/logger/logger.js';
import {
  AdminRouter,
  genrerouter,
  moviesrouter,
  userrouter,
  reviewrouter,
} from './router/index.js';

config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
await connectionDB();

app.use('/review', reviewrouter);
app.use('/admin', AdminRouter);
app.use('/user', userrouter);
app.use('/genre', genrerouter);
app.use('/movies', moviesrouter);

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
    next();
  }
});

app.listen(PORT, logger.info(`✅ server runnig on port ${PORT} `));
