const express = require("express");
const router = express.Router();

const { register, login, checkAuth } = require("../../controllers/auth");
const {
  registerValidation,
  loginValidation,
  tokenValidation,
} = require("../../middlewares/authMiddlewares");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API untuk Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Registration failed
 */
router.post("/register", registerValidation, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid login credentials
 */
router.post("/login", loginValidation, login);

/**
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Check user authentication
 *     tags: [Auth]
 *     description: Verify if the user is authenticated.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *       401:
 *         description: Unauthorized
 */
router.get("/check", tokenValidation, checkAuth);

module.exports = router;
