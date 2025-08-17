const express = require("express");
const app = express();
const {
  selectPropertyReviewsById,
  insertPropertyReviewsById,
  removePropertyReviewsById,
} = require("../models/reviews.model");

exports.getPropertyReviewsById = (req, res, next) => {
  const { id } = req.params;
  queryParam = [id];

  selectPropertyReviewsById(queryParam).then((rows) => {
    let total_rating = 0;
    for (let key of rows) {
      total_rating += key.rating;
    }
    const average_rating = total_rating / rows.length;

    const reviews = { reviews: rows, average_rating: average_rating };
    res.send(reviews);
  });
};

exports.postPropertyReviewsById = (req, res, next) => {
  const { id } = req.params;
  const { guest_id, rating, comment } = req.body;
  const postParams = [id, guest_id, rating, comment];

  insertPropertyReviewsById(postParams).then((new_review) => {
    res.status(201).send(new_review);
  });
};

exports.deletePropertyReviewsById = (req, res, next) => {
  const { id } = req.params;
  const deleteParam = [id];
  removePropertyReviewsById(deleteParam).then((deleted_review) => {
    res.status(204).send({ msg: "no body" });
  });
};
