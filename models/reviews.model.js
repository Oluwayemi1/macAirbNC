const db = require("../db/connection");

exports.selectPropertyReviewsById = (id) => {
  return db
    .query(
      "SELECT reviews.review_id, reviews.comment, reviews.rating, reviews.created_at, CONCAT (users.first_name, ' ', users.surname) AS guest, users.avatar AS guest_avatar FROM reviews LEFT JOIN users ON users.user_id = reviews.guest_id WHERE reviews.property_id = $1 GROUP BY reviews.review_id, guest, guest_avatar, users.created_at ORDER BY reviews.created_at DESC;",
      [id]
    )
    .then(({ rows }) => {
      let total_rating = 0;
      for (let key of rows) {
        total_rating += key.rating;
      }
      const average_rating = total_rating / rows.length;
      const reviews = { reviews: rows, average_rating: average_rating };
      return reviews;
    });
};

exports.insertPropertyReviewsById = (id, guest_id, rating, comment) => {
  return db
    .query(
      "INSERT INTO reviews (property_id, guest_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;",
      [id, guest_id, rating, comment]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removePropertyReviewsById = (id) => {
  return db
    .query("DELETE FROM reviews WHERE reviews.review_id = $1 RETURNING *;", [
      id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};
