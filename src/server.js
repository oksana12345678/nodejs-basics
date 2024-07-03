import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import env from './utils/env.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

const startServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });
  app.use((error, req, res) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default startServer;
