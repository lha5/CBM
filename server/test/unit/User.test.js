const userController = require('../../controller/user');
const userModel = require('../../models/User');
const httpMocks = require('node-mocks-http');
const newUser = require('../data/new-user.json');

userModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('User Controller Create', () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it('should have a createUser function', () => {
    expect(typeof userController.createUser).toBe('function');
  });

  it('should call UserModel.create', async () => {
    await userController.createUser(req, res, next);
    expect(userModel.create).toBeCalledWith(newUser);
  });

  it('should return 201 response code', async () => {
    await userController.createUser(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    userModel.create.mockReturnValue(newUser);
    await userController.createUser(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newUser);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'property missing or duplicated' };
    const rejectedPromise = Promise.reject(errorMessage);
    userModel.create.mockReturnValue(rejectedPromise);
    await userController.createUser(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});