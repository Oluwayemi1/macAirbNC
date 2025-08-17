const express = require("express");

const app = express();

const {
  selectAllProperties,
  selectPropertiesById,
} = require("../models/properties.model");

exports.getAllProperties = (req, res, next) => {
  const { property_type, max_price, min_price } = req.query;
  let { sort, order } = req.query;

  let queryValues = [];

  let queryStr =
    "SELECT properties.property_id, properties.name, properties.location, properties.price_per_night, CONCAT (users.first_name, ' ', users.surname) AS host FROM properties INNER JOIN users ON properties.host_id = users.user_id LEFT JOIN reviews ON properties.property_id = reviews.property_id";

  if (property_type) {
    queryValues.push(property_type);
    queryStr +=
      " INNER JOIN property_types ON properties.property_type = property_types.property_type WHERE property_types.property_type = $1";
  }
  if (max_price) {
    if (queryValues.length) {
      queryStr += " AND";
    } else {
      queryStr += " WHERE";
    }
    queryValues.push(max_price);
    queryStr += ` properties.price_per_night <= $${queryValues.length}`;
  }

  if (min_price) {
    if (queryValues.length) {
      queryStr += " AND";
    } else {
      queryStr += " WHERE";
    }
    queryValues.push(min_price);
    queryStr += ` properties.price_per_night >= $${queryValues.length}`;
  }
  console.log(sort);
  if (sort) {
    if (sort === "cost_per_night") {
      sort = "price_per_night";
    }
    if (sort === "popularity") {
      sort = "AVG(reviews.rating)";
    }
  }
  if (order) {
    if (order === "ascending") {
      order = "ASC";
    }
    if (order === "descending") {
      order = "DESC";
    }
  }

  selectAllProperties(queryStr, queryValues, sort, order).then((propList) => {
    const properties = { properties: propList };
    res.send(properties);
  });
};

exports.getPropertiesById = (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.query;

  let queryValue = [id];

  let queryStrg =
    "SELECT properties.property_id, properties.name AS property_name, properties.location, properties.price_per_night, properties.description, CONCAT (users.first_name, ' ', users.surname) AS host, users.avatar AS host_avatar, COUNT(favourites.property_id) AS favourite_count FROM properties INNER JOIN users ON properties.host_id = users.user_id LEFT JOIN favourites ON favourites.property_id = properties.property_id WHERE properties.property_id = $1";

  if (user_id) {
    queryValue.push(user_id);
    queryStrg =
      "SELECT properties.property_id, properties.name AS property_name, properties.location, properties.price_per_night, properties.description, CONCAT (users.first_name, ' ', users.surname) AS host, users.avatar AS host_avatar, COUNT(favourites.property_id) AS favourite_count, CASE WHEN EXISTS (SELECT favourites.guest_id FROM favourites WHERE favourites.guest_id = $2) THEN 'true' ELSE 'false' END AS favourited FROM properties INNER JOIN users ON properties.host_id = users.user_id LEFT JOIN favourites ON favourites.property_id = properties.property_id WHERE properties.property_id = $1";
  }

  selectPropertiesById(queryStrg, queryValue).then((property) => {
    res.send(property);
  });
};
