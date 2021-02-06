const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipe');

// ------------------------
//        Recipe
// ------------------------

router.get('/test', recipeController.test);

module.exports = router;