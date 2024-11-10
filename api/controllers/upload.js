const Upload = require('../models/upload');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const compress_images = require("compress-images");
const fetch = require('fetch');
const generateImageName = async() => {
    let name
    do {
        name = genRandomKey(20);
    } while (await checkIfImageExist(name))
    return name
};

const generateKey = async() => {
    let key
    do {
        key = genRandomKey(40);
    } while (await checkIfKeyExist(key))
    return key
};

const genRandomKey = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
};


const checkIfKeyExist = (key) => {
    new Promise(function(resolve, reject) { 
    Upload.countDocuments({key: key}, function (err, count){ 
        resolve(count>0)
    }); 
});
};

const checkIfImageExist = (name) => {
    new Promise(function(resolve, reject) { 
        Upload.countDocuments({image: name}, function (err, count){ 
            resolve(count>0)
        }); 
     });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp');
      },
    filename: function async(req, file, cb) {
        generateImageName(20).then((name)=>{
            cb(null, name + "." + file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2));
        })
    }
});

const uploadImg = multer({storage: storage}).single('image');

const newUpload = async (req, res) => {
    Upload.findOne(async(data)=>{
            const newUpload = new Upload({
                image: path.parse(req.file.path).base,
                key: await generateKey(40),
            })
            newUpload.save((err, data)=>{
                return res.json(data);
            })
    })    
    compress_images(
        './temp/' + path.parse(req.file.path).base,
        './images/',
        { compress_force: false, statistic: true, autoupdate: true },
        false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
          gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
        },
        function (err, completed) {
          if (completed === false) {
            console.log(err)
          } else if (completed === true) {
            fs.unlink('./temp/' + path.parse(req.file.path).base, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              })
          }
        }
      );
      
};

const getUpload = (req, res) => {
    let name = req.params.image; 
    Upload.findOne({image:name}, (err, data) => {
    if(err || !data) {
        return res.json({respond: false});
    }
    else return res.sendFile(path.resolve("./images/" + name)); 
    });
};

const getKeyUpload = async(req, res) => {
    let key = req.params.image; 
    Upload.findOne({key: key}).then(function (image) {
        return res.json(image);
    });
};

const deleteUpload = (req, res) => {
    let key = req.params.key;
        Upload.get
    Upload.deleteOne({key:key}, (err, data) => {
    if (err || data.deletedCount===1) {
        return res.json({respond: true}); 
    }else {
        return res.json({respond: false}); 
    }
    });
};

module.exports = {
    newUpload,
    getUpload,
    deleteUpload,
    uploadImg,
    getKeyUpload
};