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
const { pathNotFound } = require("./controllers/errors.controller");

const app = express();
app.use(express.json());

app.get("/api/properties", getAllProperties);

app.get("/api/properties/:id", getPropertiesById);

app.get("/api/properties/:id/reviews", getPropertyReviewsById);

app.get("/api/users/:id", getUserById);

app.post("/api/properties/:id/reviews", postPropertyReviewsById);

app.delete("/api/reviews/:id", deletePropertyReviewsById);

app.all("/*non-existent-path", pathNotFound);

module.exports = app;
