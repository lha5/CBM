const request = require('supertest');
const app = require('../../server');
const newUser = require('../data/new-user.json');

it('POST /cbm/user/signup', async () => {
  const response = await request(app)
    .post('/cbm/user/signup')
    .send(newUser);

  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newUser.name);
  expect(response.body.email).toBe(newUser.email);
});

it('should return 500 on POST /cbm/user/signup', async () => {
  const response = await request(app)
    .post('/cbm/user/signup')
    .send(newUser);
  
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({ message: response.body.message });
});