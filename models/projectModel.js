const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    userId : Object,
    organizationId : String,
    clientId : Object,
    vendorId : Object,
    projectName : String,
    startDate : String,  
    endDate : String,
    street1 : String,
    street2 : String,
    country : String,
    state : String,
    city : String,
    zipcode : String
});

let projectModel = mongoose.model("projectModel", projectSchema);
module.exports = projectModel;