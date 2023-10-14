import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: [true, 'email is already exists!'],
        required: [true, 'email is required!'],
    },
    given_name: {
        type: String,
    },
    family_name: {
        type: String,
    },
    picture: {
        type: String,
    },
});

const User = models.User || model("User", UserSchema);

export default User;