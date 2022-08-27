const express = require('express');
const router = express();


const statusHelper = require('../controllers/status.controller');






router.post('/status', statusHelper.postStatus);
router.get('/status', statusHelper.getStatus);
// router.post('/story',imageHelper.getStatus);


module.exports = router;
