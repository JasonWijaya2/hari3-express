const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "This is the API documentation for the project.",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your server URL
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the route files containing Swagger annotations
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
