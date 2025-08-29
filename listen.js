const app = require("./app");
const { PORT = 8080 } = process.env;

app.listen(8080, () => {
  console.log(`Listening on ${PORT}...`);
});
