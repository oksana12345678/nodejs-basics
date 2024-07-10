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
import validateBody from '../middlewares/validateBody.js';
import createStudentSchema, {
  updateStudentSchema,
} from '../validation/student.js';
import { isValidId } from '../middlewares/isValidId.js';

const studentRouter = Router();

studentRouter.get('/students', ctrlWrapper(getStudentsController));

studentRouter.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);
studentRouter.post(
  '/students',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
studentRouter.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
  studentRouter.put(
    '/students/:studentId',
    validateBody(createStudentSchema),

    ctrlWrapper(upsertStudentController),
  ),
  studentRouter.patch(
    '/students/:studentId',
    isValidId,
    validateBody(updateStudentSchema),
    ctrlWrapper(patchStudentController),
  ),
);

export default studentRouter;
