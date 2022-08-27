const express = require('express');
const router = express();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');




const PATH = './uploads';


router.post('/authenticate/register', ctrlUser.register);
router.post('/authenticate/login', ctrlUser.authenticate, jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/authenticate/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// router.post('/story',imageHelper.getStatus);


module.exports = router;
