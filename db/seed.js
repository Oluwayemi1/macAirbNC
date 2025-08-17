const manageTables = require("./manage-tables");
const {
  insertPropertyTypes,
  insertUsers,
  insertProperties,
  insertReviews,
  insertFavourites,
} = require("./insert-data");

const {
  reformattedUsers,
  reformattedProperties,
  usersWithReviews,
  reformattedFavourites,
} = require("./utils");

async function seed(propertyTypes, users, properties, reviews, favourites) {
  await manageTables();

  await insertPropertyTypes(propertyTypes);

  const usersInDB = await insertUsers(users);

  const propertyWithUserRef = await reformattedUsers(usersInDB);

  const propertyRows = await insertProperties(properties, propertyWithUserRef);

  const propertyWithHostRef = await reformattedProperties(propertyRows);

  const userReviews = await usersWithReviews(
    reviews,
    propertyWithUserRef,
    propertyWithHostRef
  );

  await insertReviews(userReviews);

  const usersWithFavourites = await reformattedFavourites(
    favourites,
    propertyWithUserRef,
    propertyWithHostRef
  );

  await insertFavourites(usersWithFavourites);
}

module.exports = seed;
