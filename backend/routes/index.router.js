const express =require('express');
const router =express();

const ctrlUser=require('../controllers/user.controller');

router.post('/register',ctrlUser.register);

module.exports=router;