const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// ------------------------
//          User
// ------------------------

router.post('/signup', userController.createUser);

module.exports = router;
