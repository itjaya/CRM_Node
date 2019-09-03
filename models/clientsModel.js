const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
    organizationId : String,
    clientName : String,
    contactNumber : String,
    emailId : String,
    addressStreet : String,
    country : String,
    state : String,
    city : String,
    zipcode : String,
    website : String,
    category : String,
    status : String,
    contacts : [{
        personName : String,
        designation : String,
        emailId : String,
        mobileNo : String,
        address : String,
        country : String,
        state : String,
        city : String,
        zipcode : String,
        status : String,
        owner : String
    }]

});

let clientModel = mongoose.model("clientModel", clientSchema);
module.exports = clientModel;