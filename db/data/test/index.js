exports.bookingsData = require("./bookings.json");
exports.favouritesData = require("./favourites.json");
exports.imagesData = require("./images.json");
exports.propertiesData = require("./properties.json");
exports.propertyTypesData = require("./property-types.json");
exports.reviewsData = require("./reviews.json");
exports.usersData = require("./users.json");

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool();

pool.query("SELECT * FROM airbnc_test").then(() => {
  console.log("query made");
});
