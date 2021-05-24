import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import User from "../../models/User.model.js";

router.get("/", (req, res) => {
  User.find({})
    .then((result) => {
      res.send(result);
      console.log("User GET method success");
    })
    .catch((err) => {
      console.log("Users GET method failed");
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params._id)
    .then((result) => {
      res.send(result);
      console.log("User GET id Method Success");
    })
    .catch((err) => {
      console.log("User GET id Method failed");
    });
});

router.post("/", (req, res) => {
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    userName: req.body.userName,
    email: req.body.email,
    role: req.body.role,
    lastFlight: req.body.lastFlight,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
