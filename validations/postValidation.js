import { body } from 'express-validator';

const postValidator = [
  body('title', 'ошибка').isString().isLength({ min: 5 }).optional(),
  body('text', 'ошибка').isString().isLength({ min: 5 }).optional(),
  body('tags', 'ошибка').isArray(),
  body('imageUrl', 'ошибка').isString(),
];

export default postValidator;
