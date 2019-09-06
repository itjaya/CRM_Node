const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let timesheetSchema = new Schema({
    userId : String,
    organizationId : String,
    project : Object,
    description : String,
    year : String,
    events : [{
        week : [{ 
            date: String,
            weekNo: String,
            isAllDay : Boolean,
            lock : { type : Boolean, default : false}
        }]
    }] 
});

let timesheetModel = mongoose.model("timesheetModel", timesheetSchema);
module.exports = timesheetModel;