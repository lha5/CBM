const request = require('supertest');
const app = require('../../server');
const newRecipe = require('../data/new-recipe.json');

let firstRecipe;

it('POST /cbm/recipe/upload', async () => {
  const response = await request(app)
    .post('/cbm/recipe/upload')
    .send(newRecipe);

  expect(response.statusCode).toBe(201);
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

it('GET /cbm/recipe/recipes', async () => {
  const response = await request(app)
    .get('/cbm/recipe/recipes');

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].title).toBeDefined();
  expect(response.body[0].content).toBeDefined();

  firstRecipe = response.body[0];
});

it('GET /cbm/recipe/recipe/:recipeId', async () => {
  const response = await request(app)
    .get(`/cbm/recipe/recipe/${firstRecipe._id}`);
    
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe(firstRecipe.title);
  expect(response.body.content).toBe(firstRecipe.content);
});

it('GET id does not exist /cbm/recipe/recipe/:recipeId', async () => {
  const response = await request(app)
    .get('/cbm/recipe/recipe/601ea1fee0fe3a0a5c03357b');

  expect(response.statusCode).toBe(404);
});

it('PUT /cbm/recipe/update/:recipeId', async () => {
  const response = await request(app)
    .put(`/cbm/recipe/update/${firstRecipe._id}`)
    .send({ title: 'updated title', content: 'updated content' });

  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe('updated title');
  expect(response.body.content).toBe('updated content');
});

it('PUT id does not exist /cbm/recipe/update/:recipeId', async () => {
  const response = await request(app)
    .put('/cbm/recipe/update/6024b648e594e56dd8a1989a')
    .send({ title: 'updated title', content: 'updated content' });

  expect(response.statusCode).toBe(404);
});

it('DELETE /cbm/recipe/delete/:recipeId', async () => {
  const response = await request(app)
    .delete(`/cbm/recipe/delete/${firstRecipe._id}`)
    .send();

  expect(response.statusCode).toBe(200);
});

it('DELETE id does not exist /cbm/recipe/delete/:recipeId', async () => {
  const response = await request(app)
    .delete('/cbm/recipe/delete/6024b648e594e56dd8a1989a')
    .send();

  expect(response.statusCode).toBe(404);
});
