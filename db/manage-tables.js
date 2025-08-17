const db = require("./connection");
const {
  createPropertyTypesTable,
  createUsersTable,
  createPropertiesTable,
  createReviewsTable,
  createFavouritesTable,
} = require("./create-table-queries");

async function manageTables() {
  await db.query("DROP TABLE IF EXISTS favourites;");
  await db.query("DROP TABLE IF EXISTS reviews;");
  await db.query("DROP TABLE IF EXISTS properties;");
  await db.query("DROP TABLE IF EXISTS property_types;");
  await db.query("DROP TABLE IF EXISTS users;");
  await db.query(createPropertyTypesTable);
  await db.query(createUsersTable);
  await db.query(createPropertiesTable);
  await db.query(createReviewsTable);
  await db.query(createFavouritesTable);
}
module.exports = manageTables;
