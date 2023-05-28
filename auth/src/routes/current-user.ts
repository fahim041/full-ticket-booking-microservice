import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("users!!");
});

export { router as currentUserRouter };
