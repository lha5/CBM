const recipeModel = require('../models/Recipe');

exports.createRecipe = (req, res, next) => {
  const createdRecipe = recipeModel.create(req.body);
  res.status(201).json(createdRecipe);
}