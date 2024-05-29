// middlewares/admin.js
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = adminMiddleware;
