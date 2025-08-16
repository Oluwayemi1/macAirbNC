const express = require("express");
const db = require("./db/connection");
const app = express();
app.use(express.json());

app.get("/api/properties", (req, res, next) => {
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
  console.log(sort, order);
  db.query(
    `${queryStr} GROUP BY properties.property_id, host ORDER BY ${
      sort || "AVG(reviews.rating)"
    } ${order || "ASC"}`,
    queryValues
  ).then(({ rows }) => {
    const properties = { properties: rows };
    res.send(properties);
  });
});

module.exports = { app };
