import Post from '../models/post.js';

export const getPostAll = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').exec();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      seccess: false,
    });
  }
};
export const getPostOne = async (req, res) => {
  try {
    const postId = req.params.id;
    Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          return res.status(404).json({
            seccess: err,
          });
        }
        if (!doc) {
          return res.status(404).json({
            seccess: err,
          });
        }
        res.json(doc);
      },
    );
  } catch (e) {
    console.log(e);
    res.status(404).json({
      seccess: false,
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    Post.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(404).json({
            seccess: err,
          });
        }
        if (!doc) {
          return res.status(404).json({
            seccess: err,
          });
        }
        res.json({
          success: true,
        });
      },
    );
  } catch (e) {
    console.log(e);
    res.status(404).json({
      seccess: false,
    });
  }
};
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.updateOne(
      {
        _id: postId,
      },
      {
        text: req.body.text,
        title: req.body.title,
        tags: req.body.tags,
        viewsCount: req.body.viewsCount,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );
    res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      seccess: false,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const doc = new Post({
      text: req.body.text,
      title: req.body.title,
      tags: req.body.tags,
      viewsCount: req.body.viewsCount,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      seccess: 'user not find',
    });
  }
};
