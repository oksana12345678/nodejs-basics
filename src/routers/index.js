import { Router } from 'express';
import studentRouter from './students.js';
import authRouter from './auth.js';

const routers = Router();

routers.use('/auth', authRouter);

routers.use('/', studentRouter);

export default routers;
