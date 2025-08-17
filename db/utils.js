exports.formattedPropertyTypes = (propertyTypes) => {
  return propertyTypes.map(({ property_type, description }) => [
    property_type,
    description,
  ]);
};

exports.formattedUsers = (users) => {
  return users.map(
    ({ first_name, surname, email, phone_number, is_host, avatar }) => [
      first_name,
      surname,
      email,
      phone_number,
      is_host,
      avatar,
    ]
  );
};

exports.reformattedUsers = (user) => {
  return user.rows.map((row) => {
    const { first_name, surname, user_id } = row;
    row[`${first_name} ${surname}`] = user_id;
    return row;
  });
};

exports.formattedProperties = (properties, propRef) => {
  return properties.map((property) => {
    const {
      host_name,
      name,
      property_type,
      location,
      price_per_night,
      description,
    } = property;
    propRef.forEach((item) => {
      const host_id = item[property.host_name];
      if (host_id) {
        property.host_id = host_id;
      }
    });

    return [
      property.host_id,
      name,
      location,
      property_type,
      price_per_night,
      description,
    ];
  });
};

exports.reformattedProperties = (property) => {
  return property.rows.map((row) => {
    const { name, property_id } = row;
    row[`${name}`] = row.property_id;
    return row;
  });
};

exports.usersWithReviews = (reviews, users, properties) => {
  return reviews.map((user) => {
    const { guest_name, property_name, rating, comment, created_at } = user;

    users.forEach((person) => {
      const guest_id = person[user.guest_name];

      if (guest_id) {
        user.guest_id = guest_id;
      }
    });
    properties.forEach((property) => {
      const property_id = property[user.property_name];
      if (property_id) {
        user.property_id = property_id;
      }
    });

    return [user.property_id, user.guest_id, rating, comment, created_at];
  });
};

exports.formattedReviews = (userReviews) => {
  return userReviews.filter((userB) => {
    if (userB[1]) {
      return userB;
    }
  });
};

exports.reformattedFavourites = (favourites, users, properties) => {
  return favourites.map((favourite) => {
    const { guest_name, property_name } = favourite;
    users.forEach((personFav) => {
      const guest_id = personFav[favourite.guest_name];
      if (guest_id) {
        favourite.guest_id = guest_id;
      }
    });
    properties.forEach((propertyFav) => {
      const property_id = propertyFav[favourite.property_name];
      if (property_id) {
        favourite.property_id = property_id;
      }
    });
    return [favourite.guest_id, favourite.property_id];
  });
};

exports.formattedFavourites = (userFavourites) => {
  return userFavourites.filter((userFavB) => {
    if (userFavB[0]) {
      return userFavB;
    }
  });
};
