const express = require("express");
// const { upload } = require("../../../helpers/uploadFile");
const { createUploadFile } = require("../../controllers/upload");
const multer = require("multer");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: API untuk mengelola file upload
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Upload]
 *     description: Upload a single file to the server.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: No file selected or invalid file type
 */
const upload = multer();
router.post("/", upload.single("file"), createUploadFile);

module.exports = router;
