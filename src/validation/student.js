import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  // email: Joi.string().email().required(),
  age: Joi.number().integer().min(6).max(16).required().messages({
    'number.base': 'Age should be a number!',
    'number.integer': 'Number should be integer!',
    'number.min': 'Age should have at least {#limit}',
    'number.max': 'Age should have at most {#limit}',
    'any.required': 'Age is required!',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender should be a string',
  }),
  avgMark: Joi.number().min(2).max(12).required().messages({
    'number.base': 'Mark should be a number!',
    'number.min': 'Mark should have at list {#limit}',
    'number.max': 'Mark should have at most {#limit}',
    'any.required': 'Mark is required!',
  }),
  onDuty: Joi.boolean(),
  parentId: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.base': 'Username should be a string!',
    'string.min': 'Username should have at least {#limit} characters!',
    'string.max': 'Username should have at most {#limit} characters!',
  }),
  // email: Joi.string().email(),
  age: Joi.number().integer().min(6).max(16).messages({
    'number.base': 'Age should be a number!',
    'number.integer': 'Number should be integer!',
    'number.min': 'Age should have at least {#limit}',
    'number.max': 'Age should have at most {#limit}',
  }),
  gender: Joi.string().valid('male', 'female', 'other').messages({
    'string.base': 'Gender should be a string',
  }),
  avgMark: Joi.number().min(2).max(12).messages({
    'number.base': 'Mark should be a number!',
    'number.min': 'Mark should have at list {#limit}',
    'number.max': 'Mark should have at most {#limit}',
  }),
  onDuty: Joi.boolean(),
});
