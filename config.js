const SECRET_KEY = process.env.SECRET_KEY;

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const BASE_URL = `http://${HOST}:${PORT}`;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = {
  SECRET_KEY,
  PORT,
  HOST,
  BASE_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
};
