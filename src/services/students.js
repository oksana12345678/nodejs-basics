import StudentCollection from '../validation/student.js';

export const getAllStudents = async () => {
  const students = await StudentCollection.find();
  return students;
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
