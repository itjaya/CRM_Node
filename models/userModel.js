const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName : String,
    lastName : String,
    // middleName : String,
    email : String,
    role : String,
    createdAt : String,
    password: String
});

let userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;