const request = require('supertest');
const app = require('../../server');
const newRecipe = require('../data/new-recipe.json');

it('POST /cbm/recipe/upload', async () => {
  const response = await request(app)
    .post('/cbm/recipe/upload')
    .send(newRecipe);

  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe(newRecipe.title);
  expect(response.body.content).toBe(newRecipe.content);
  expect(response.body.category).toBe(newRecipe.category);
});

it('should return 500 on POST /cbm/recipe/upload', async () => {
  const response = await request(app)
    .post('/cbm/recipe/upload')
    .send({ title: '제목 테스트' });

  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({ message: response.body.message });
});