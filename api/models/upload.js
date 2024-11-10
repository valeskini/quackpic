const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    image: String,
    key: String,
    api: String,
});

const Upload = mongoose.model('Upload', UploadSchema);
module.exports = Upload; 
