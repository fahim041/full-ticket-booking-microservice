import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'product-1',
      price: 10,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'product-1',
      price: 10,
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  //create a ticket
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'product-1',
      price: 10,
    });

  //update the ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin()) //different user
    .send({
      title: 'product-1',
      price: 20,
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  //create a ticket
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'product-1',
      price: 10,
    });

  //update the ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie) //same user
    .send({
      title: '',
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie) //same user
    .send({
      title: 'product-1',
      price: -20,
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  //create a ticket
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'product-1',
      price: 10,
    });

  //update the ticket
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie) //same user
    .send({
      title: 'product-2',
      price: 20,
    })
    .expect(200);

  //fetch the ticket
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  //check if the ticket is updated
  expect(ticketResponse.body.title).toEqual('product-2');
  expect(ticketResponse.body.price).toEqual(20);
});
