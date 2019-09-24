const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let addressSchema = new Schema({
    userId : String,
    street1 : String,
    country : String,
    state : String,
    city : String,
    zipcode : Number,
    startDate : String,
    endDate : String,
    active : Boolean
});

let addressModel = mongoose.model("addressModel", addressSchema);
module.exports = addressModel;