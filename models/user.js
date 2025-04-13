import { Schema, model } from "mongoose";

const userschema = new Schema ({
    firstName: {type: String, required: true, unique: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const User = model("User", userschema);
export default User;