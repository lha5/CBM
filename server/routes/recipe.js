const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipe');

// ------------------------
//        Recipe
// ------------------------

router.post('/upload', recipeController.createRecipe);

router.get('/recipe', recipeController.getRecipes);

module.exports = router;