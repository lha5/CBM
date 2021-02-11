const recipeController = require('../../controller/recipe');
const recipeModel = require('../../models/Recipe');
const httpMocks = require('node-mocks-http');
const newRecipe = require('../data/new-recipe.json');
const allRecipe = require('../data/all-recipe.json');
const Recipe = require('../../models/Recipe');

recipeModel.create = jest.fn();
recipeModel.find = jest.fn();
recipeModel.findById = jest.fn();

const recipeId = '601ea1fee0fe3a0a5c02216f';

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
  it('should be function type', () => {
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

describe('Recipe Controller GetById', () => {
  it('should have a getRecipeById', () => {
    expect(typeof recipeController.getRecipeById).toBe('function');
  });

  it('should call recipeModel.findById', async () => {
    req.params.recipeId = recipeId;
    await recipeController.getRecipeById(req, res, next);
    expect(recipeModel.findById).toBeCalledWith(recipeId);
  });

  it('should return JSON body and response code 200', async () => {
    recipeModel.findById.mockReturnValue(newRecipe);
    await recipeController.getRecipeById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newRecipe);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return 404 when item does not exist', async () => {
    recipeModel.findById.mockReturnValue(null);
    await recipeController.getRecipeById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error occured' };
    const rejectedPromise = Promise.reject(errorMessage);
    recipeModel.findById.mockReturnValue(rejectedPromise);
    await recipeController.getRecipeById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});