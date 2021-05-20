const express = require("express");
const app = express();
const cors = require("cors");
const { Mongoose } = require("mongoose");

//Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors test
app.use(cors());

app.listen(8080, () => console.log("listening"));
