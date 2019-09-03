const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema({
    userId : String,
    street1 : String,
    country : String,
    state : String,
    city : String,
    zipcode : String,
    startDate : String,
    endDate : String,
    active : String
});

let addressModel = mongoose.model("addressModel", addressSchema);
module.exports = addressModel;