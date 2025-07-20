exports.bookingsData = require("./bookings.json");
exports.favouritesData = require("./favourites.json");
exports.imagesData = require("./images.json");
exports.propertiesData = require("./properties.json");
exports.propertyTypesData = require("./property-types.json");
exports.reviewsData = require("./reviews.json");
exports.usersData = require("./users.json");

const formattedPropertyTypes = this.propertyTypesData.map(
  ({ property_type, description }) => [property_type, description]
);

const formattedUsers = this.usersData.map(
  ({ first_name, surname, email, phone_number, is_host, avatar }) => [
    first_name,
    surname,
    email,
    phone_number,
    is_host,
    avatar,
  ]
);

// const formattedProperties = this.propertiesData.map(
//   ({
//     name,
//     property_type,
//     location,
//     price_per_night,
//     description,
//     host_name,
//     amenities,
//   }) => [
//     name,
//     property_type,
//     location,
//     price_per_night,
//     description,
//     host_name,
//     amenities,
//   ]
// );

// const formattedReviews = this.reviewsData.map(
//   ({ guest_name, property_name, rating, comment, created_at }) => [
//     guest_name,
//     property_name,
//     rating,
//     comment,
//     created_at,
//   ]
// );
module.exports = { formattedPropertyTypes, formattedUsers };
