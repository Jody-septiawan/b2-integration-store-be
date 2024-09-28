const { generateToken } = require("../../helpers/token");
const {
  createUser,
  findUserByEmail,
  findUserByUsername,
} = require("../repositories/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const emailExist = await findUserByEmail(req.body.email);
    const usernameExist = await findUserByUsername(req.body.username);

    if (emailExist && usernameExist) {
      return res.status(400).send({
        message: "Email and Username have been used",
      });
    }

    if (emailExist) {
      return res.status(400).send({
        message: "Email has been used",
      });
    } else if (usernameExist) {
      return res.status(400).send({
        message: "Username has been used",
      });
    }

    const user = await createUser(req.body);

    res.send({ message: "Register success", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Register failed", error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return res.status(400).send({
        message: "Invalid login",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid login" });
    }

    delete user.password;

    const token = generateToken(user);

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid login", error });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await findUserByEmail(req.userEmail);

    if (!user) {
      return res.status(400).send({
        message: "Invalid user",
      });
    }

    delete user.password;

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid user", error });
  }
};
