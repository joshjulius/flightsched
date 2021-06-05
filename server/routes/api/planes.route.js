import mongoose from "mongoose";
import express from "express";
import Planes from "../../models/Planes.model.js";
const router = express.Router();

router.get("/", (req, res) => {
  Planes.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("Plane API get Error");
    });
});

export default router;
