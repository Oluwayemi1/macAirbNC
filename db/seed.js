const manageTables = require("./manage-tables");
const {
  insertPropertyTypes,
  insertUsers,
  insertProperties,
  insertReviews,
} = require("./insert-data");
const {
  reformattedUsers,
  reformattedProperties,
  usersWithReviews,
} = require("./utils");
// const data = require("../db/data/test/index");
// const { propertyTypesData, propertiesData, usersData, reviewsData } = data;

async function seed(propertyTypes, users, properties, reviews) {
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
}

module.exports = seed;
