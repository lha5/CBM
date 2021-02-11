const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res, next) => {
  try {
    const createdRecipe = await Recipe.create(req.body);  
    res.status(201).json(createdRecipe);
  } catch (error) {
    next(error);    
  }
}

exports.getRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find({});
    res.status(200).json(allRecipes);
  } catch (error) {
    next(error);
  }
}

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}
