module.exports = (req, res, next) => {
  req.message = 'Hello World!';
  next();
};
