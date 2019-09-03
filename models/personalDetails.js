const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let personalDetailSchema = new Schema({
    userId : String,
    jobTitle : String,
    alternateEmailId : String,
    dateOfJoining : String,
    gender : String,  
    phoneNo : String,
    SSN : Number,
    dateOfBirth : String,
    workAuthorization : String,
    country: String,
    State : String,
    maritalStatus : String,
    payrollId : String
});

let personalDetailModel = mongoose.model("personalDetailModel", personalDetailSchema);
module.exports = personalDetailModel;