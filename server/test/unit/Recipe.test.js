const recipeController = require('../../controller/recipe');
const recipeModel = require('../../models/Recipe');
const httpMocks = require('node-mocks-http');
const newRecipe = require('../data/new-recipe.json');

recipeModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('Recipe Controller Create', () => {
  beforeEach(() => {
    req.body = newRecipe;
  });

  it('should have a createRecipe function', () => {
    expect(typeof recipeController.createRecipe).toBe('function');
  });

  it('should call RecipeModel.create', () => {

    recipeController.createRecipe(req, res, next);
    expect(recipeModel.create).toBeCalledWith(newRecipe);
  });

  it('should return 201 response code', () => {
    recipeController.createRecipe(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', () => {
    recipeModel.create.mockReturnValue(newRecipe);
    recipeController.createRecipe(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newRecipe);
  });
});