import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User from '../models/users.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('error');
      return res.status(400).json(errors.array());
    }
    const password = req.body.passwordHash;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email: req.body.email,
      passwordHash: hash,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user.id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
  }
};
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      console.log('ОШИБКА1');
      return res.status(400).json({
        massage: 'пользователь не найден',
      });
    }
    const isTruePassword = await bcrypt.compare(req.body.passwordHash, user._doc.passwordHash);
    if (!isTruePassword) {
      console.log('ОШИБКА2');
      console.log(req.body);
      console.log(user._doc);
      return res.status(400).json({
        massage: 'пользователь не найден',
      });
    }
    const token = jwt.sign(
      {
        _id: user.id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
  }
};

export const checkMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        succses: false,
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
  }
};
