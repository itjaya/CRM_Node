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
    fax : String,
    contacts : [{
        personName : String,
        designation : String,
        emailId : String,
        mobileNo : String,
        streetAddress : String,
        country : String,
        state : String,
        city : String,
        zipcode : String,
        owner : String,
        linkedInUrl : String,
        facebookUrl : String,
        twitterUrl : String,
        officeNumber : String
    }]

});

let clientModel = mongoose.model("clientModel", clientSchema);
module.exports = clientModel;