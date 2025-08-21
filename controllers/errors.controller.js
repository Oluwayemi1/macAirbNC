exports.pathNotFound = (err, req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};
