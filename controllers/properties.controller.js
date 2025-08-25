const {
  selectAllProperties,
  selectPropertyById,
} = require("../models/properties.model");

exports.getAllProperties = (req, res, next) => {
  const { property_type, max_price, min_price } = req.query;
  const { sort, order } = req.query;

  selectAllProperties(property_type, max_price, min_price, sort, order).then(
    (properties) => {
      res.send(properties);
    }
  );
};

exports.getPropertyById = (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.query;

  try {
    selectPropertyById(id, user_id).then((property) => {
      res.send(property);
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
