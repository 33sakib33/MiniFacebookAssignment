const express =require('express');
const router =express();

const ctrlUser=require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
const imageHelper=require('../controllers/imageUpload.controller');

router.post('/register',ctrlUser.register);
router.post('/login',ctrlUser.authenticate,jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.post('/status',ctrlUser.postStatus);
router.get('/status',ctrlUser.getStatus);
router.post('/story',imageHelper.generateUUID,imageHelper.uploadImageIDmongoDB,imageHelper.uploadImage);
// router.post('/story',imageHelper.getStatus);


module.exports=router;