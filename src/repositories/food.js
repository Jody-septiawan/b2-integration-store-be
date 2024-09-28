const db = require("../../libs/database");

exports.createFood = async (body) => {
  try {
    const { title, image, price } = body;
    const createdAt = new Date();

    const query = `INSERT INTO public."Foods"
                          (title, image, price, created_at)
                          VALUES ( '${title}', '${image}', ${price}, '${createdAt}') RETURNING *;`;

    const res = await db.query(query);

    const food = res.rows[0];

    return food;
  } catch (err) {
    throw new Error("Error creating food");
  }
};

exports.findFoods = async () => {
  try {
    const query = `SELECT id, title, image, price, created_at
	                    FROM public."Foods";`;

    const res = await db.query(query);

    return res.rows;
  } catch (err) {
    throw new Error("Error finding foods");
  }
};

exports.getFoodById = async (id) => {
  try {
    const query = `SELECT id, title, image, price, created_at
                          FROM public."Foods" WHERE id=${id};`;

    const res = await db.query(query);

    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    throw new Error("Error finding foods");
  }
};

exports.deleteFood = async (id) => {
  try {
    const query = `DELETE FROM public."Foods" WHERE id=${id} RETURNING *;`;

    const res = await db.query(query);

    return res.rows.length > 0 ? res.rows[0] : null;
  } catch (err) {
    throw new Error("Error delete food");
  }
};

exports.editFood = async (id, body) => {
  try {
    const { title, image, price } = body;

    const query = `UPDATE public."Foods"
                    SET  title='${title}', image='${image}', price=${price} 
                    WHERE id='${id}' RETURNING *;`;

    const res = await db.query(query);

    const food = res.rows[0];

    return food;
  } catch (err) {
    throw new Error("Error edit food");
  }
};
