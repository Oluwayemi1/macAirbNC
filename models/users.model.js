const db = require("../db/connection");

exports.selectUserById = (queryParam) => {
  return db
    .query(
      "SELECT user_id, first_name, surname, email, phone_number, avatar, created_at FROM users WHERE user_id = $1;",
      queryParam
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
