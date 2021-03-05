const cloudinary = require("cloudinary").v2;

const CLOUDINARY_APIKEY = process.env.CLOUDINARY_APIKEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const CLOUDINARY_CLOUDNAME = process.env.CLOUDINARY_CLOUDNAME;

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUDNAME,
    api_key: CLOUDINARY_APIKEY,
    api_secret: CLOUDINARY_SECRET,
    use_filename: true,
    secure: true,
  });
};

module.exports = configCloudinary;
