const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
   
  const storage = new CloudinaryStorage({

    cloudinary,
    params: {
      allowed_formats: ['jpg', 'png', 'jpeg'],
      folder: 'DecorBuddy', // The name of the folder in cloudinary
     
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
  });
   

  const fileUploader = multer({ storage: storage });

  module.exports = fileUploader;