const express = require("express");
const db = require("./db/connection");
const {
  getAllProperties,
  getPropertiesById,
} = require("./controllers/properties.controller");
const { getUserById } = require("./controllers/users.controller");
const {
  getPropertyReviewsById,
  postPropertyReviewsById,
  deletePropertyReviewsById,
} = require("./controllers/reviews.controller");

const app = express();

app.get("/api/properties", getAllProperties);

app.get("/api/properties/:id", getPropertiesById);

app.get("/api/properties/:id/reviews", getPropertyReviewsById);

app.get("/api/users/:id", getUserById);

app.post("/api/properties/:id/reviews", postPropertyReviewsById);

app.delete("/api/reviews/:id", deletePropertyReviewsById);

module.exports = { app };
