const db = require("./connection");
const format = require("pg-format");
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
const data = require("../db/data/test/index");
const { propertyTypesData, propertiesData, usersData, reviewsData } = data;

async function seed(propertyTypesData, usersData, propertiesData, reviewsData) {
  await manageTables();

  //   const formattedPropertyTypes = propertyTypesData.map(
  //     ({ property_type, description }) => [property_type, description]
  //   );
  await insertPropertyTypes(propertyTypesData);

  //   await db.query(
  //     format(
  //       `INSERT INTO property_types(property_type, description) VALUES %L`,
  //       formattedPropertyTypes
  //     )
  //   );

  //   const formattedUsers = usersData.map(
  //     ({ first_name, surname, email, phone_number, is_host, avatar }) => [
  //       first_name,
  //       surname,
  //       email,
  //       phone_number,
  //       is_host,
  //       avatar,
  //     ]
  //   );

  //   const userRows = await db.query(
  //     format(
  //       `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING *`,
  //       formattedUsers
  //     )
  //   );
  const userRows = await insertUsers(usersData);

  //   const propertyRef = userRows.rows.map((row) => {
  //     const { first_name, surname, user_id } = row;
  //     row[`${first_name} ${surname}`] = user_id;
  //     return row;
  //   });
  const propertyRef = await reformattedUsers(userRows);

  //   const formattedProperties = propertiesData.map((property) => {
  //     const {
  //       host_name,
  //       name,
  //       property_type,
  //       location,
  //       price_per_night,
  //       description,
  //     } = property;
  //     propertyRef.forEach((item) => {
  //       const host_id = item[property.host_name];
  //       if (host_id) {
  //         property.host_id = host_id;
  //       }
  //     });

  //     return [
  //       property.host_id,
  //       name,
  //       location,
  //       property_type,
  //       price_per_night,
  //       description,
  //     ];
  //   });
  // await formattedProperties(propertiesData, propertyRef)

  const propertyRows = await insertProperties(propertiesData, propertyRef);

  //   const propertyRows = await db.query(
  //     format(
  //       `INSERT INTO properties(host_id, name, location, property_type, price_per_night, description) VALUES %L RETURNING *`,
  //       formattedProperties(propertiesData, propertyRef)
  //     )
  //   );
  //   const propertiesRef = propertyRows.rows.map((row) => {
  //     const { name, property_id } = row;
  //     row[`${name}`] = row.property_id;
  //     return row;
  //   });
  const propertiesRef = await reformattedProperties(propertyRows);

  //   const reviewRef = userRows.rows.map((row) => {
  //     const { first_name, surname, user_id } = row;
  //     row[`${first_name} ${surname}`] = user_id;
  //     return row;
  //   });

  const userReviews = await usersWithReviews(
    reviewsData,
    propertyRef,
    propertiesRef
  );

  //   const relevantUser = reviewsData.map((user) => {
  //     const { guest_name, property_name, rating, comment, created_at } = user;

  //     propertyRef.forEach((person) => {
  //       const guest_id = person[user.guest_name];

  //       if (guest_id) {
  //         user.guest_id = guest_id;
  //       }
  //     });
  //     propertiesRef.forEach((property) => {
  //       const property_id = property[user.property_name];
  //       if (property_id) {
  //         user.property_id = property_id;
  //       }
  //     });

  //     return [user.property_id, user.guest_id, rating, comment, created_at];
  //   });

  //     const formattedReviews = relevantUser.filter((user) => {
  //       if (user[1]) return user;
  //     });

  await insertReviews(userReviews);
  //   await db.query(
  //     format(
  //       `INSERT INTO reviews(property_id, guest_id, rating, comment, created_at) VALUES %L`,
  //       formattedReviews
  //     )
  //   );
  console.log("seed don run ooooooo");
}

module.exports = seed;
