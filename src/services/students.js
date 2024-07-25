import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import StudentCollection from '../validation/student.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentQuery = StudentCollection.find();
  const studentsCount = await StudentCollection.countDocuments();

  const students = await studentQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(studentsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId) => {
  const student = await StudentCollection.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const student = await StudentCollection.create(payload);
  return student;
};
export const deleteStudent = async (studentId) => {
  const student = await StudentCollection.findOneAndDelete({ _id: studentId });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentCollection.findByIdAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
