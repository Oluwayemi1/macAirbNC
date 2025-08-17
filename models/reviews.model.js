const db = require("../db/connection");

exports.selectPropertyReviewsById = (queryParam) => {
  return db
    .query(
      "SELECT reviews.review_id, reviews.comment, reviews.rating, reviews.created_at, CONCAT (users.first_name, ' ', users.surname) AS guest, users.avatar AS guest_avatar FROM reviews LEFT JOIN users ON users.user_id = reviews.guest_id WHERE reviews.property_id = $1 GROUP BY reviews.review_id, guest, guest_avatar, users.created_at ORDER BY users.created_at;",
      queryParam
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertPropertyReviewsById = (postParams) => {
  return db
    .query(
      "INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;",
      postParams
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removePropertyReviewsById = () => {
  return db
    .query(
      "DELETE FROM reviews WHERE reviews.review_id = $1 RETURNING *;",
      deleteParam
    )
    .then(({ rows }) => {
      return rows;
    });
};
