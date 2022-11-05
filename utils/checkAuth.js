import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const tocken = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (tocken) {
    try {
      const decoded = jwt.verify(tocken, 'secret123');
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        success: ' нету доступа',
      });
    }
  } else {
    return res.status(403).json({
      success: ' нету доступа',
    });
  }
};
export default checkAuth;
