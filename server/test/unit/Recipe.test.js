const recipeController = require('../../controller/recipe');
const recipeModel = require('../../models/Recipe');
const httpMocks = require('node-mocks-http');
const newRecipe = require('../data/new-recipe.json');
const allRecipe = require('../data/all-recipe.json');
const Recipe = require('../../models/Recipe');

recipeModel.create = jest.fn();
recipeModel.find = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Recipe Controller Create', () => {
  beforeEach(() => {
    req.body = newRecipe;
  });

  it('should have a createRecipe function', () => {
    expect(typeof recipeController.createRecipe).toBe('function');
  });

  it('should call RecipeModel.create', async () => {
    await recipeController.createRecipe(req, res, next);
    expect(recipeModel.create).toBeCalledWith(newRecipe);
  });

  it('should return 201 response code', async () => {
    await recipeController.createRecipe(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    recipeModel.create.mockReturnValue(newRecipe);
    await recipeController.createRecipe(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newRecipe);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);
    recipeModel.create.mockReturnValue(rejectedPromise);
    await recipeController.createRecipe(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Recipe Controller Get', () => {
  it('should', () => {
    expect(typeof recipeController.getRecipes).toBe('function');
  });

  it('should call recipeModel.find({})', async () => {
    await recipeController.getRecipes(req, res, next);
    expect(recipeModel.find).toHaveBeenCalledWith({});
  });
  
  it('should return 200 response code', async () => {
    await recipeController.getRecipes(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body in response', async () => {
    recipeModel.find.mockReturnValue(allRecipe);
    await recipeController.getRecipes(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allRecipe);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'No data may exist' };
    const rejectedPromise = Promise.reject(errorMessage);
    Recipe.find.mockReturnValue(rejectedPromise);
    await recipeController.getRecipes(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});