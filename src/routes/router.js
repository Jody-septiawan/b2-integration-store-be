const express = require("express");
const router = express.Router();

const authRoutes = require("./api/auth");
const foodRoutes = require("./api/food");
const uploadRoutes = require("./api/upload");

router.get("/", (req, res) => {
  res.send({
    message: "alive /api",
  });
});

router.use("/auth", authRoutes);
router.use("/foods", foodRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;
