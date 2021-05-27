import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    lastFlight: { type: String, required: true },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;
