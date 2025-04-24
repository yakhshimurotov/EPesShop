import { Schema, Types, model } from "mongoose";

const Productschema = new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    url: {type: String, required: true},
    uzs: {type: String, required: true},
    scores: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User"},
},{
    timestamps: true,
})

const Product = model("Product", Productschema);
export default Product;