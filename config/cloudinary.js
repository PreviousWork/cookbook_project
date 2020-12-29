const cloudinary          = require('cloudinary');
const cloudinaryStorage   = require('multer-storage-cloudinary');
const multer              = require('multer');
const Ingredient          = require("../models/ingredient");


cloudinary.config({
  cloud_name: process.env.doggy_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

var theStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name', // The name of the folder in cloudinary you can make it dynamic in a sexy sexy way
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
  cb(null, `my-file-${Math.floor(Math.random() * Math.floor(10000))}`); // The file on cloudinary would have the same name as the original file name
  }
});

// const uploadCloud = multer({ storage: theStorage }).single('file');
const uploadCloud = multer({ storage: theStorage });
module.exports = uploadCloud;
