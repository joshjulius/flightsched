import express from "express";
const router = express.Router();
import User from "../../models/User.model.js";

router.post("/register", (req, res) => {
  res.send("Register");
});

// router.post('/login')

export default router;
