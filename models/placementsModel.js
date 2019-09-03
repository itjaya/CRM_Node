const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let placementSchema = new Schema({
    userId : String,
    jobTitle : String,
    alternateEmailId : String,
    dateOfJoining : String,
    gender : String,  
    phoneNo : Number,
    SSN : Number,
    dateOfBirth : String,
    workAuthorization : String,
    country: String,
    State : String,
    maritalStatus : String,
    payrollId : String
});

let placementModel = mongoose.model("placementModel", placementSchema);
module.exports = placementModel;