const db = require("./connection");
const {
  createPropertyTypesTable,
  createUsersTable,
  createPropertiesTable,
  createReviewsTable,
} = require("./create-table-queries");

async function manageTables() {
  await db.query("DROP TABLE IF EXISTS reviews;");

  await db.query("DROP TABLE IF EXISTS properties;");

  await db.query("DROP TABLE IF EXISTS property_types;");
  await db.query("DROP TABLE IF EXISTS users;");
  await db.query(createPropertyTypesTable);
  await db.query(createUsersTable);
  await db.query(createPropertiesTable);
  await db.query(createReviewsTable);
}
module.exports = manageTables;
