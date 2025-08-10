const seed = require("./seed");
const data = require("../db/data/test/index");
const db = require("./connection.js");
const { propertyTypesData, usersData, reviewsData, propertiesData } = data;

seed(propertyTypesData, usersData, propertiesData, reviewsData).then(() =>
  db.end()
);
