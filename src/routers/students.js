import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const studentRouter = Router();

studentRouter.get('/students', ctrlWrapper(getStudentsController));

studentRouter.get(
  '/students/:studentId',
  ctrlWrapper(getStudentByIdController),
);
studentRouter.post('/students', ctrlWrapper(createStudentController));
studentRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteStudentController),
  studentRouter.put(
    '/students/:studentId',
    ctrlWrapper(upsertStudentController),
  ),
  studentRouter.patch(
    '/students/:studentId',
    ctrlWrapper(patchStudentController),
  ),
);

export default studentRouter;
