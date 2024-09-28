const bcrypt = require("bcrypt");
const db = require("../../libs/database");

const createUser = async (body) => {
  try {
    const { fullName, username, email, password } = body;

    const createdAt = new Date();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `INSERT INTO public."Users"(
                      username, email, password, fullname, created_at)
                    VALUES ('${username}', '${email}', '${hashedPassword}', '${fullName}', '${createdAt}') RETURNING *;`;
    const res = await db.query(query);

    const newUser = res.rows[0];

    delete newUser.password;

    return newUser;
  } catch (err) {
    throw new Error("Error creating user");
  }
};

const findUserByEmail = async (email) => {
  try {
    const query = `SELECT id, username, fullname, email, password, created_at
	                  FROM public."Users" WHERE email='${email}';`;

    const res = await db.query(query);

    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    throw new Error("Error finding user by email");
  }
};

const findUserByUsername = async (username) => {
  try {
    const query = `SELECT id, username, fullname, email, password, created_at
	                  FROM public."Users" WHERE username='${username}';`;

    const res = await db.query(query);

    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    throw new Error("Error finding user by username");
  }
};

module.exports = { createUser, findUserByEmail, findUserByUsername };
