const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timesheetSchema = new Schema({
    userId : String,
    organizationId : String,
    projectId : String,
    weekNo : String,
    startDate : String,
    endDate : String,
    totalHrs : String,
    comments : String
});

let timesheetModel = mongoose.model("timesheetModel", timesheetSchema);
module.exports = timesheetModel;