const { BASE_URL } = require("../../config");
const { cloudinary } = require("../../helpers/cloudinary");

// const getUrl = (file) => {
//   return `${BASE_URL}${file.destination.replace(".", "")}${file.filename}`;
// };

exports.createUploadFile = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "No file selected!" });
    }

    const file = req.file;

    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, "-");
    const newPublicId = `${timestamp}-${originalName}`;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: newPublicId,
            resource_type: "image",
            overwrite: true,
            folder: "food-store",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    res.send({
      filename: result.display_name,
      url: result.url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid upload File", error });
  }
};
