const express = require('express');
const router = express.Router();
const cors = require('cors');
const uploadController = require('../controllers/upload');
var corsOptions = {
    origin: false,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
router.options("*", cors());
router.get("/:image", cors(), uploadController.getUpload);

module.exports = router;
