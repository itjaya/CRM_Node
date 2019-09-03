const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    userId : String,
    organizationId : String,
    clientId : String,
    vendorId : String,
    projectName : String,
    startDate : String,  
    endDate : String,
});

let projectModel = mongoose.model("projectModel", projectSchema);
module.exports = projectModel;