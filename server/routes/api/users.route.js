import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import User from "../../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import verify from "../../verifyToken/verifyToken.js";

dotenv.config();

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

//User Login Authentication
router.post("/login", async (req, res) => {
  const data = req.body;

  //Check
  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(400).send("Invalid Email");
  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  //Create and assign a JWT Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 300,
  });
  try {
    res
      .header("auth-token", token)
      .json({ auth: true, token: token, user: user });
  } catch {
    res.json({ auth: false, message: "Wrong Email/Password" });
  }
});

//Creating a new User to the Users JSON
router.post("/register", async (req, res) => {
  const data = req.body;
  //Check if it is a duplicated email or not
  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) {
    return res.status(400).send("Email already existed");
  }

  //Hasing the passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  console.log("register");

  // Saving the new User into the MongoDB database

  const newUser = new User({
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: hashedPassword,
  });

  newUser
    .save()
    .then((result) => {
      console.log("User POST method success");
      res.send("User has been Created");
    })
    .catch((err) => {
      console.log("User POST method failed");
      console.log(err);
      res.status(400).send("User is not created");
    });
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
