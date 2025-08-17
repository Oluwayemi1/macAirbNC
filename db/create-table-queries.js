exports.createPropertyTypesTable = `CREATE TABLE property_types(
        property_type VARCHAR NOT NULL PRIMARY KEY,
        description TEXT NOT NULL );`;
exports.createUsersTable = `CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        surname VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone_number VARCHAR,
        is_host BOOL NOT NULL,
        avatar VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
exports.createPropertiesTable = `CREATE TABLE properties(
        property_id SERIAL PRIMARY KEY,
        host_id INT NOT NULL REFERENCES users(user_id) ON DELETE SET NULL,
        name VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
        price_per_night DECIMAL NOT NULL,
        description TEXT);`;
exports.createReviewsTable = `CREATE TABLE reviews(
        review_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL REFERENCES properties(property_id),
        guest_id INT NOT NULL REFERENCES users(user_id),
        rating INT NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
exports.createFavouritesTable = `CREATE TABLE favourites(
        favourite_id SERIAL PRIMARY KEY, 
        guest_id INT NOT NULL REFERENCES users(user_id) ON DELETE SET NULL,
        property_id INT NOT NULL REFERENCES properties(property_id) ON DELETE SET NULL);`;
