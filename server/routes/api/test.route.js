import express from "express";
const router = express.Router();
import verify from "../../verifyToken/verifyToken.js";

router.get("/", verify, (req, res) => {
  res.json({
    post: {
      title: "Verified Information",
      description: "Only user with a JWT Token can view this",
    },
  });
});

export default router;
