import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { studentId } = req.params;

  if (!isValidObjectId(studentId)) {
    throw createHttpError(404, 'Not found');
  }
  next();
};

export default isValidId;
