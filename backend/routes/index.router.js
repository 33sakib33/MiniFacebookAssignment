const express =require('express');
const router =express();

const ctrlUser=require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register',ctrlUser.register);
router.post('/login',ctrlUser.authenticate,jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);
router.post('/status',ctrlUser.postStatus);
router.get('/status',ctrlUser.getStatus);
module.exports=router;