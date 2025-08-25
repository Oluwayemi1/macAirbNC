exports.urlNotFound = (req, res, next) => {
  res.status(404).send({ msg: "URL not found" });
};

exports.handleBadRequest = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
};
