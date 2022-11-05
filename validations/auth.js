import { body } from 'express-validator';

const registerValidator = [
  body('email', 'ошибка').isEmail(),
  body('passwordHash', 'ошибка').isLength({ min: 5 }),
  body('name', 'ошибка').isLength({ min: 5 }),
  body('avatarUrl', 'ошибка').optional().isURL(),
];

export default registerValidator;
