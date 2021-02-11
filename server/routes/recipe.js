const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipe');

// ------------------------
//        Recipe
// ------------------------

router.post('/upload', recipeController.createRecipe);

router.get('/recipes', recipeController.getRecipes);

router.get('/recipe', recipeController.getRecipeById);

module.exports = router;