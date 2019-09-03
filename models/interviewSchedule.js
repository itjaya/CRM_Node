const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let interviewScheduleSchema = new Schema({
    userId : String,
    organizationId : String,
    jobPostingId : String,
    date_time : String,
    client : String,
    clientContact : String,
    interviewMode : String,
    activationDate : String,
    contactNo : String,
    skypeId : String,
    venue : String,
    interviewers : String,
    interviewRounds : String,
    comments: String
});

let interviewScheduleModel = mongoose.model("interviewScheduleModel", interviewScheduleSchema);
module.exports = interviewScheduleModel;