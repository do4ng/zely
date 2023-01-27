module.exports.get = function (req, res) {
  res.json({ message: req.message }); // middlewares/message.js
};
