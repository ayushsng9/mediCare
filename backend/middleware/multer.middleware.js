import multer from "multer";

// storing file on disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // we will get the filename
  }
})

export const upload = multer({storage})