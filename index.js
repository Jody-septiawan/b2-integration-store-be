require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const { BASE_URL, HOST, PORT } = require("./config");
const swaggerUi = require("swagger-ui-express");

const routes = require("./src/routes/router");
const { swaggerDocs } = require("./src/docs");

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send({
    message: "alive /",
  });
});

app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, HOST, () => {
  console.log("+===================================================");
  console.log("|");
  console.log(`| Server is running on ${BASE_URL}`);
  console.log("|");
  console.log("+===================================================");
});
