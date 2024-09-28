const { z } = require("zod");

exports.dtoFoodValidation = (req, res, next) => {
  const createFoodSchema = z.object({
    title: z.string(),
    image: z.string().url(),
    price: z.number(),
  });

  try {
    createFoodSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: "Create Food failed", error });
  }
};
