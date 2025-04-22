require("dotenv").config();
const express = require("express");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(morgan("dev"));

app.use(routes);

app.use(errorHandler);

module.exports = app;
