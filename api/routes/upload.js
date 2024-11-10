const express = require('express');
const router = express.Router();
const cors = require('cors');
const uploadController = require('../controllers/upload');
var corsOptions = {
    origin: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
router.options("*", cors());
router.post("/v1/upload", cors(), uploadController.uploadImg, uploadController.newUpload);
router.get("/v1/get/:image", cors(), uploadController.getUpload);
router.get("/v1/key/:image", cors(), uploadController.getKeyUpload);
router.delete("/v1/delete/:key", cors(), uploadController.deleteUpload);

module.exports = router;
