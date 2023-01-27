module.exports.get = function (req, res) {
  res.json({ id: req.params.id });
};
