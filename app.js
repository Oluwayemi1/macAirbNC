const express = require("express");
const db = require("./db/connection");
const app = express();
app.use(express.json());

app.get("/api/properties", (req, res, next) => {
  db.query("SELECT * FROM properties;").then(({ rows }) => {
    const properties = { properties: rows };
    res.send(properties);
  });
});

module.exports = { app };
