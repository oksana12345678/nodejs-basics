import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import env from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';

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

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });
  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }
    res.status(200).json({
      data: student,
    });
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
