const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res, next) => {
  try {
    const createdRecipe = await Recipe.create(req.body);
  
    // console.log('createdRecipe: ', createdRecipe);
  
    res.status(200).json(createdRecipe);
  } catch (error) {
    next(error);    
  }
}