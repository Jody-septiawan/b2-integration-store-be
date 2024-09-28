const express = require("express");
const {
  findFoods,
  createFood,
  getFoodById,
  deleteFood,
  editFood,
} = require("../../controllers/food");
const { dtoFoodValidation } = require("../../middlewares/foodMiddlewares");
const { tokenValidation } = require("../../middlewares/authMiddlewares");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: API untuk mengelola makanan
 */

/**
 * @swagger
 * /api/foods:
 *   get:
 *     summary: Mendapatkan daftar makanan
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Daftar makanan berhasil diambil
 */
router.get("/", findFoods);

/**
 * @swagger
 * /api/foods/{id}:
 *   get:
 *     summary: Mendapatkan makanan berdasarkan ID
 *     tags: [Foods]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID makanan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Makanan berhasil diambil
 *       404:
 *         description: Makanan tidak ditemukan
 */
router.get("/:id", getFoodById);

/**
 * @swagger
 * /api/foods:
 *   post:
 *     summary: Membuat makanan baru
 *     tags: [Foods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: uri
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Makanan berhasil dibuat
 *       400:
 *         description: Validasi gagal
 */
router.post("/", tokenValidation, dtoFoodValidation, createFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   delete:
 *     summary: Menghapus makanan berdasarkan ID
 *     tags: [Foods]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID makanan
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Makanan berhasil dihapus
 *       404:
 *         description: Makanan tidak ditemukan
 */

router.delete("/:id", tokenValidation, deleteFood);

/**
 * @swagger
 * /api/foods/{id}:
 *   patch:
 *     summary: Mengedit makanan berdasarkan ID
 *     tags: [Foods]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID makanan
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: uri
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Makanan berhasil diedit
 *       404:
 *         description: Makanan tidak ditemukan
 */
router.patch("/:id", tokenValidation, dtoFoodValidation, editFood);

module.exports = router;
