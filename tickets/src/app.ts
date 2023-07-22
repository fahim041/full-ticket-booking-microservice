import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@fasticket/common';

const app = express();
app.set('trust proxy', true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

//not found routes
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

//middlwares
app.use(errorHandler);

export { app };
