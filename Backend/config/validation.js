import Joi from 'joi';

/**
 * Validation schemas for input validation
 */

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
  role: Joi.string().valid('student', 'instructor').default('student'),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  videoUrl: Joi.string().uri().allow('', null),
});

export const lessonSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  order: Joi.number().default(0),
});
