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
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/student.js';
import { isValidId } from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const studentRouter = Router();

studentRouter.use(authenticate);

studentRouter.get(
  '/students',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getStudentsController),
);

studentRouter.get(
  '/students/:studentId',
  checkRoles(ROLES.PARENT, ROLES.TEACHER),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentRouter.post(
  '/register',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentRouter.post(
  '/students',
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);
studentRouter.delete(
  '/students/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

studentRouter.put(
  '/students/:studentId',
  validateBody(createStudentSchema),
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(upsertStudentController),
);
studentRouter.patch(
  '/students/:studentId',
  checkRoles(ROLES.PARENT, ROLES.TEACHER),
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default studentRouter;
