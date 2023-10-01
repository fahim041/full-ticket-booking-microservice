import request from 'supertest';
import { app } from '../../app';


it('can fetch a list of tickets', async () => {
  // Create three tickets
  const tickets = [
    { title: 'product-1', price: 10 },
    { title: 'product-2', price: 20 },
    { title: 'product-3', price: 30 },
  ];

  for (const ticket of tickets) {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send(ticket)
      .expect(201);
  }

  // Fetch all tickets
  const res = await request(app).get('/api/tickets').send().expect(200);

  // Make sure we only got the three tickets
  expect(res.body.length).toEqual(3);
});
