const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobPostingSchema = new Schema({
    jobCode : String,
    jobTitle : String,
    clientBillRate : String,
    payRate : String,
    activationDate : String,
    closingDate : String,
    expensesPaid : String,
    remoteJob : String,
    country : String,
    state : String,
    city: String,
    zipcode : String,
    reqHrsPerWeek : String,
    jobStatus : String,
    clientName : String,
    clientJobId : String,
    duration : String,
    interviewMode : String,
    workAuthorization : String,
    priority : String,
    industry : String,
    degree : String,
    experience : String,
    languages : String,
    noOfPositions : String,
    employmentType : String,
    salesManager : String,
    recruitmentManager : String,
    jobDescription : String
});

let jobPostingModel = mongoose.model("jobPostingModel", jobPostingSchema);
module.exports = jobPostingModel;