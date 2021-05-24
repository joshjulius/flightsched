import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: Number,
    name: String,
    phone: Number,
    userName: String,
    email: String,
    role: String,
    lastFlight: String,
  },
  { collection: "user" }
);

const user = mongoose.model("user", userSchema);
export default user;
