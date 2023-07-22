import supertest from 'supertest';
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
  await supertest(app).get('/api/tickets/123456789').send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'product-1';
  const price = 10;

  const res = await supertest(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201);

  const ticketRes = await supertest(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()
    .expect(200);

  expect(ticketRes.body.title).toEqual(title);
  expect(ticketRes.body.price).toEqual(price);
});
