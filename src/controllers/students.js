import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { resetPassword } from '../services/auth.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await getStudentById(studentId, req.user._id);

    if (!student) {
      next(createHttpError(404, 'Student not found'));
      return;
    }
    res.json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

export const createStudentController = async (req, res) => {
  const contactData = {
    ...req.body,
    userId: req.user._id,
  };

  const student = await createStudent(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a student!',
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId, req.user._id);

  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.user._id, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a student!',
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const result = await updateStudent(studentId, {
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patch a student!',
    data: result.student,
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
