import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import adminRouter from './routes/admin.routes.js';
import doctorRouter from './routes/doctor.routes.js';
import graphRouter from './routes/graph.routes.js';
import patientRouter from './routes/patient.routes.js';
import cookieParser from 'cookie-parser';
import logger from './utils/logger/logger.js';
import AppointmentRouter from './routes/appointment.routes.js';
config();

const app = express();
const PORT = +process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDB();
app.use('/appointment', AppointmentRouter);
app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);
app.use('/graph', graphRouter);
app.use('/patient', patientRouter);

process.on('uncaughtException', (err) => {
  if (err) console.log(`Uncaught exception: ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reasion, promise) => {
  console.log(`Unhandled rejection: ${reasion}`);
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

app.listen(PORT, logger.info(`Server running on port ${PORT}`));
