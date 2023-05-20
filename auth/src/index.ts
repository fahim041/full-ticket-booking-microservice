import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/api/users/currentuser", (req: Request, res: Response) => {
  res.send("Users!");
});

app.listen(3000, () => {
  console.log("auth service listening on port 3000");
});
