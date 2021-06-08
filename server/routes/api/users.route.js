import express from "express";
import bcrypt from "bcryptjs";
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
router.post("/register", async (req, res) => {
  const data = req.body;

  //Check if it is a duplicated email or not

  const emailExist = await User.findOne({ email: data.email });
  console.log(emailExist);
  if (emailExist) {
    return res.status(400).send("Email already exists");
    console.log("email already exists")
  }

  //Hasing the passwords

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const newUser = new User({
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: hashedPassword,
  });

  //Saving the new User into the MongoDB database
  newUser
    .save()
    .then((result) => {
      console.log("User POST method success");
      res.send("User has been Created");
    })
    .catch((err) => {
      console.log("User POST method failed");
      console.log(err);
    });

  // User.find({})
  //   .then((result) => {
  //     res.send("user has been created");
  //   })
  //   .catch((err) => {
  //     console.log("User created error");
  //   });
});

//Deleting an User by matching the id
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

  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send({ success: false });
      console.log(err);
    });
});

//Editing/Updating an User
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  User.findByIdAndUpdate(id, updatedUser, { upsert: true })
    .then((editUser) => {
      console.log("Edit User Success");
    })
    .catch((err) => {
      console.log("Edit User failed");
      console.log(err);
    });

  User.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send({ success: false });
      console.log(err);
    });
});

export default router;
