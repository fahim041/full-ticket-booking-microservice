import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@fasticket/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(showTicketRouter);

app.use(createTicketRouter);

//not found routes
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

//middlwares
app.use(errorHandler);

export { app };
