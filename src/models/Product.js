import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    category: String,
    description: String,
    price: Number,
    imgUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);
