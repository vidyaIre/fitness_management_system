const { response } = require('express');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');
const imageUpload = async (filepath) => { 
try {
    const result = await cloudinary.uploader.upload(filepath, {
        folder:"images"
    });
    fs.unlinkSync(filepath);
    return result.secure_url;
}catch(error){
    throw new Error("cloudinary upload failed");
}

};
module.exports = imageUpload;
