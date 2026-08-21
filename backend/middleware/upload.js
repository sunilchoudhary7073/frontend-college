const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    const fileName = path
      .basename(file.originalname, ext)
      .trim()
      .replace(/\s+/g, "-")        // spaces -> -
      .replace(/[^\w\-]/g, "");    // remove special characters

    cb(null, `${Date.now()}-${fileName}${ext}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;