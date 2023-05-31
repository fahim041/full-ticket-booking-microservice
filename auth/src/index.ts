import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const app = express();
app.use(express.json());

//routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signupRouter);

//not found routes
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

//middlwares
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongodb..");
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  app.listen(3000, () => {
    console.log("auth service listening on port 3000");
  });
};

start();
