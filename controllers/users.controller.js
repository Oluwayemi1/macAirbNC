const express = require("express");
const app = express();
const { selectUserById } = require("../models/users.model");

exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  queryParam = [id];
  selectUserById(queryParam).then((user) => {
    res.send(user);
  });
};
