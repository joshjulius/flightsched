import express from "express";
const router = express.Router();
import verify from "../../verifyToken/verifyToken.js";

router.get("/jwtValid", verify, (req, res) => {
  res.json("JWT is valid");
});

export default router;
