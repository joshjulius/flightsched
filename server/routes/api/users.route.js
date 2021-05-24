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

//Sending Users JSON to the GET endpoint
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.send(result);
      console.log("User GET id Method Success");
    })
    .catch((err) => {
      console.log("User GET id Method failed");
    });
});

//Creating a new User to the Users JSON
router.post("/", (req, res) => {
  const data = req.body;
  const newUser = new User(data);

  //Saving the new User into the MongoDB database
  newUser
    .save()
    .then((result) => {
      console.log("User POST method success");
    })
    .catch((err) => {
      console.log("User POST method failed");
      console.log(err);
    });

  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      console.log("User has been deleted");
    })
    .catch((err) => {
      console.log(err);
      console.log("Delete method failed");
    });

  User.find({}).then((result) => {
    res.send(result);
  });
});

export default router;
