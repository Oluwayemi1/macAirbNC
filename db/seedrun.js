const seed = require("./seed");
// const data = require("./data/test/index");

// const {
//   formattedPropertyTypes,
//   formattedProperties,
//   formattedUsers,
//   formattedReviews,
// } = data;

const { formattedPropertyTypes, formattedUsers } = require("./data/test/index");

seed(formattedPropertyTypes, formattedUsers);
