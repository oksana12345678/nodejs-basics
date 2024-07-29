import { Router } from 'express';
import studentRouter from './students.js';
import authRouter from './auth.js';

const routers = Router();

routers.use('/', studentRouter);

routers.use('/auth', authRouter);

export default routers;
