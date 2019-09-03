const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vendorSchema = new Schema({
    organizationId : String,
    vendorName : String,
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

let vendorModel = mongoose.model("vendorModel", vendorSchema);
module.exports = vendorModel;