const db = require("../db/connection");

exports.selectAllProperties = (queryStr, queryValues, sort, order) => {
  return db
    .query(
      `${queryStr} GROUP BY properties.property_id, host ORDER BY ${
        sort || "AVG(reviews.rating)"
      } ${order || "ASC"}`,
      queryValues
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectPropertiesById = (queryStrg, queryValue) => {
  return db
    .query(
      `${queryStrg} GROUP BY properties.property_id, host, host_avatar`,
      queryValue
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
