const { z } = require("zod");
const { verifyToken } = require("../../helpers/token");
const { findUserByEmail } = require("../repositories/user");

exports.registerValidation = (req, res, next) => {
  const registerSchema = z.object({
    fullName: z.string().min(3, "Minimal harus 3 karakter ya..."),
    username: z.string().min(6, "Minimal harus 6 karakter ya..."),
    email: z.string().email("Format email tidak sesuai ..."),
    password: z.string().min(4, "Minimal harus 4 karakter ya..."),
  });

  try {
    registerSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: "Register failed", error });
  }
};

exports.loginValidation = (req, res, next) => {
  const loginSchema = z.object({
    email: z.string().email("Format email tidak sesuai ..."),
    password: z.string().min(4, "Minimal harus 4 karakter ya..."),
  });

  try {
    loginSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid login", error });
  }
};

exports.tokenValidation = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const payload = verifyToken(token);

    if (!payload.id) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const user = await findUserByEmail(payload.email);

    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    delete user.password;

    req.userId = user.id;
    req.userEmail = user.email;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid login", error });
  }
};
