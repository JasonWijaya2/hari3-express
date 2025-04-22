const app = require("./app.js");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
