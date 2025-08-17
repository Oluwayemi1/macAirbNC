const db = require("./connection");
const format = require("pg-format");
const data = require("../db/data/test/index");
const {
  formattedPropertyTypes,
  formattedUsers,
  formattedProperties,
  formattedReviews,
  formattedFavourites,
} = require("./utils");

exports.insertPropertyTypes = (propertyTypes) => {
  return db.query(
    format(
      `INSERT INTO property_types(property_type, description) VALUES %L`,
      formattedPropertyTypes(propertyTypes)
    )
  );
};

exports.insertUsers = (users) => {
  return db.query(
    format(
      `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING *`,
      formattedUsers(users)
    )
  );
};

exports.insertProperties = (properties, propRef) => {
  return db.query(
    format(
      `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L RETURNING *`,
      formattedProperties(properties, propRef)
    )
  );
};

exports.insertReviews = (filteredReview) => {
  return db.query(
    format(
      `INSERT INTO reviews (property_id, guest_id, rating, comment, created_at) VALUES %L`,
      formattedReviews(filteredReview)
    )
  );
};

exports.insertFavourites = (filteredFavourites) => {
  return db.query(
    format(
      `INSERT INTO favourites (guest_id, property_id) VALUES %L`,
      formattedFavourites(filteredFavourites)
    )
  );
};
