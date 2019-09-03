const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let submissionSchema = new Schema({
    userId : String,
    jobPostingId : String,
    jobTitle : String,
    skills : String,
    expYrs : String,
    availableDate : String,  
    payRate : Number,
    billRate : Number,
    openToRelocate : String,
    comments : String
});

let submissionModel = mongoose.model("submissionModel", submissionSchema);
module.exports = submissionModel;