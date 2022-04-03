

const express = require('express');
//Destructuring concepts of java script
const {getResponses, submitResponses} = require('../controller/responseController.js');

const router =  express.Router();
router.get('/response', getResponses);
router.post('/response', submitResponses);

module.exports = router;