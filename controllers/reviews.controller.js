const express = require("express");
const {
  selectPropertyReviewsById,
  insertPropertyReviewsById,
  removePropertyReviewsById,
} = require("../models/reviews.model");

const app = require("../app");

exports.getPropertyReviewsById = (req, res, next) => {
  const { id } = req.params;
  selectPropertyReviewsById(id).then((reviews) => {
    res.send(reviews);
  });
};

exports.postPropertyReviewsById = (req, res, next) => {
  const { id } = req.params;
  const { guest_id, rating, comment } = req.body;
  insertPropertyReviewsById(id, guest_id, rating, comment).then((newReview) => {
    res.status(201).send(newReview);
  });
};

exports.deletePropertyReviewsById = (req, res, next) => {
  const { id } = req.params;
  removePropertyReviewsById(id).then(() => {
    res.status(204).end();
  });
};
