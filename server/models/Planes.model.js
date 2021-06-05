import mongoose from "mongoose";
const Schema = mongoose.Schema;

const planesSchema = new Schema(
  {
    reg: { type: String },
    type: { type: String },
  },
  { collection: "planes" }
);

const Planes = mongoose.model("Planes", planesSchema);
export default Planes;
