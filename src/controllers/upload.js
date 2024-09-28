const { BASE_URL } = require("../../config");

const getUrl = (file) => {
  return `${BASE_URL}${file.destination.replace(".", "")}${file.filename}`;
};

exports.createUploadFile = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "No file selected!" });
    }

    const url = getUrl(req.file);

    res.send({
      filename: req.file.filename,
      url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid upload File", error });
  }
};
