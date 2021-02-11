const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipe');

// ------------------------
//        Recipe
// ------------------------

router.post('/upload', recipeController.createRecipe);

router.get('/recipes', recipeController.getRecipes);

router.get('/recipe/:recipeId', recipeController.getRecipeById);

router.put('/update/:recipeId', recipeController.updateRecipe);

router.delete('/delete/:recipeId', recipeController.deleteRecipe);

module.exports = router;