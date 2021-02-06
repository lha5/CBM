const recipeController = require('../../controller/recipe');
const recipeModel = require('../../models/Recipe');
const httpMocks = require('node-mocks-http');
const newRecipe = require('../data/new-recipe.json');

recipeModel.create = jest.fn();

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

  it('should return 200 response code', async () => {
    await recipeController.createRecipe(req, res, next);
    expect(res.statusCode).toBe(200);
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