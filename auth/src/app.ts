import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
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

//routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signupRouter);

//not found routes
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

//middlwares
app.use(errorHandler);

export { app };
