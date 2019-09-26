const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timesheetSchema = new Schema({
    userId: Object,
    organizationId: String,
    project: String,
    prjStartDate : String,
    prjEndDate : String,
    description: String,
    year: String,
    uploads :[],
    events: [{
        weekNo : String,
        year : String,
        month : String,
        description : String,
        dates : [{
            title : Number,
            start: String,
            end : String,
            weekNo: String,
            month : String,
            year : String,
            isAllDay: Boolean,
            lock: { type: Boolean, default: false }
        }]
    }]
});

let timesheetModel = mongoose.model("timesheetModel", timesheetSchema);
module.exports = timesheetModel;