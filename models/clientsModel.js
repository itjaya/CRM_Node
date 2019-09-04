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
    url : String,
    url1 : String,
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
        owner : String,
        linkedInUrl : String,
        facebookUrl : String,
        twitterUrl : String,
        officeNumber : String
    }]

});

let clientModel = mongoose.model("clientModel", clientSchema);
module.exports = clientModel;