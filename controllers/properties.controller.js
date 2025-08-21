const {
  selectAllProperties,
  selectPropertiesById,
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

exports.getPropertiesById = (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.query;

  selectPropertiesById(id, user_id).then((property) => {
    res.send(property);
  });
};
