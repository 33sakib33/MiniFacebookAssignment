const express = require('express');
const router = express();


const imageHelper = require('../controllers/imageUpload.controller');


const multer = require('multer');

const PATH = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
let upload = multer({
    storage: storage
});


router.post('/story', upload.single("image"), imageHelper.generateUUID, imageHelper.uploadImageIDmongoDB, imageHelper.uploadImage);
router.get('/story', imageHelper.getUuidForUser);
// router.post('/story',imageHelper.getStatus);


module.exports = router;