const {
  findFoods,
  createFood,
  getFoodById,
  deleteFood,
  editFood,
} = require("../repositories/food");

exports.createFood = async (req, res) => {
  try {
    const food = await createFood(req.body);

    if (!food) {
      return res.status(400).send({
        message: "Invalid creating Food",
      });
    }

    res.send(food);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid creating Food", error });
  }
};

exports.findFoods = async (req, res) => {
  try {
    const foods = await findFoods();

    if (!foods) {
      return res.status(400).send({
        message: "Invalid get Foods",
      });
    }

    res.send(foods);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid finding Food", error });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await getFoodById(id);

    if (!food) {
      return res.status(400).send({
        message: "Invalid finding Food",
      });
    }

    res.send(food);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid finding Food", error });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await deleteFood(id);

    if (!food) {
      return res.status(400).send({
        message: "Invalid delete Food",
      });
    }

    res.send({ message: "Delete Food Success", food });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid delete Food", error });
  }
};

exports.editFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await editFood(id, req.body);

    if (!food) {
      return res.status(400).send({
        message: "Invalid edit Food",
      });
    }

    res.send({ message: "Edit Food Success", food });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid edit Food", error });
  }
};
