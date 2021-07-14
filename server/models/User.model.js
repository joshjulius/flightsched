import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String },
    password: { type: String, required: true },
    role: { type: String },
    filter: [
      { name: { type: String } },
      { aircraft: { type: String, required: true } },
      { instructor: { type: String, required: true } },
    ],
    lastFlight: { type: String },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);
export default User;
