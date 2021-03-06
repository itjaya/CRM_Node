const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName : String,
    lastName : String,
    organization : Array,
    // middleName : String,
    email : String,
    role : Object,
    createdAt : String,
    account : false,
    password: String
});

let userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;