import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    next(
      createHttpError(400, 'Bad Request', {
        errors: err.details,
      }),
    );
  }
};

export default validateBody;
