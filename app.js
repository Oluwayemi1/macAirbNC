const express = require("express");
const db = require("./db/connection");
const {
  getAllProperties,
  getPropertyById,
} = require("./controllers/properties.controller");
const { getUserById } = require("./controllers/users.controller");
const {
  getPropertyReviewsById,
  postPropertyReviewsById,
  deletePropertyReviewsById,
} = require("./controllers/reviews.controller");
const {
  urlNotFound,
  handleBadRequest,
  handleCustomErrors,
} = require("./controllers/errors.controller");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/api/properties", getAllProperties);

app.get("/api/properties/:id", getPropertyById);

app.get("/api/properties/:id/reviews", getPropertyReviewsById);

app.get("/api/users/:id", getUserById);

app.post("/api/properties/:id/reviews", postPropertyReviewsById);

app.delete("/api/reviews/:id", deletePropertyReviewsById);

app.all("/*invalid-URL", urlNotFound);

app.use(handleBadRequest);

app.use(handleCustomErrors);

module.exports = app;
