const swaggerJsdoc = require("swagger-jsdoc");
const { BASE_URL } = require("../../config");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Store API",
      version: "1.0.0",
      description: "API Documentation",
      contact: {
        name: "Nama Kamu",
        email: "namakamu@store.api",
      },
      servers: [
        {
          url: BASE_URL,
        },
      ],
    },
  },
  apis: ["./src/routes/api/*.js"],
};

exports.swaggerDocs = swaggerJsdoc(swaggerOptions);
