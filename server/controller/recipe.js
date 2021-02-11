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

exports.updateRecipe = async (req, res, next) => {
  try {
    let updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.recipeId,
        req.body,
        { updated: true }
      );

    if (updatedRecipe) {
      res.status(200).json(updatedRecipe);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

exports.deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    
    if (deletedRecipe) {
      res.status(200).json(deletedRecipe);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}
