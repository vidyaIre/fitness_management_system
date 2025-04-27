const cloudinary = require('cloodinary').v2;
const imageUpload = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'your-folder-name', // Optional
    });
    return result.secure_url; // ✅ get the hosted image URL
  };
  
  module.exports = imageUpload;