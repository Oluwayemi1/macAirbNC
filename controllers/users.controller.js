const { selectUserById } = require("../models/users.model");

exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  selectUserById(id).then((user) => {
    res.send(user);
  });
};
