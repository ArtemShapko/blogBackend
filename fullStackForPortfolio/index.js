import express from 'express';
import mongoose from 'mongoose';
import registerValidator from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { checkMe, register, login } from './controllers/userController.js';
import postValidator from './validations/postValidation.js';
import {
  createPost,
  deletePost,
  getPostAll,
  getPostOne,
  updatePost,
} from './controllers/postControllers.js';

const db =
  'mongodb+srv://ArtemShapko:pass321@cluster0.azasdon.mongodb.net/blog?retryWrites=true&w=majority';
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log('Подключино');
  })
  .catch((e) => console.log(e));
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Users
app.get('/auth/me', checkAuth, checkMe);
app.post('/auth/reg', registerValidator, register);
app.post('/auth/log', registerValidator, login);
// Posts
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  res.json({
    img: `/profile/${req.file.originalname}`,
  });
});
app.post('/posts', checkAuth, postValidator, createPost);
app.get('/posts', getPostAll);
app.get('/posts/:id', getPostOne);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch('/posts/:id', checkAuth, updatePost);

app.listen(4444, (err) => {
  err ? console.log('error') : 'all good';
});
