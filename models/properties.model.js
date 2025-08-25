const db = require("../db/connection");

exports.selectAllProperties = (
  property_type,
  max_price,
  min_price,
  sort,
  order
) => {
  let queryValues = [];
  let sortBy = "AVG(reviews.rating)";
  let orderBy = "ASC";

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

  if (sort && sort === "cost_per_night") {
    sortBy = "price_per_night";
  }

  if (order && order === "descending") {
    orderBy = "DESC";
  }

  return db
    .query(
      `${queryStr} GROUP BY properties.property_id, host ORDER BY ${sortBy} ${orderBy}`,
      queryValues
    )
    .then(({ rows }) => {
      const properties = { properties: rows };
      return properties;
    });
};

exports.selectPropertyById = (id, user_id) => {
  const queryValue = [id];

  let queryStrg =
    "SELECT properties.property_id, properties.name AS property_name, properties.location, properties.price_per_night, properties.description, CONCAT (users.first_name, ' ', users.surname) AS host, users.avatar AS host_avatar, COUNT(favourites.property_id) AS favourite_count";

  if (user_id) {
    queryValue.push(user_id);
    queryStrg += `, CASE WHEN EXISTS (SELECT favourites.guest_id FROM favourites WHERE favourites.guest_id = $${queryValue.length}) THEN 'true' ELSE 'false' END AS favourited`;
  }

  return db
    .query(
      `${queryStrg} FROM properties INNER JOIN users ON properties.host_id = users.user_id LEFT JOIN favourites ON favourites.property_id = properties.property_id WHERE properties.property_id = $1 GROUP BY properties.property_id, host, host_avatar;`,
      queryValue
    )
    .then(({ rows }) => {
      const property = { property: rows[0] };

      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Property not found" });
      }
      return property;
    });
};
