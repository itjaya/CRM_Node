const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orgSchema = new Schema({
    organizationName: String,
        website: String,
        description: String,
        orgEmail: String,
        orgPhNo: String,
        orgFaxNo: String,
        stAddress1: String,
        stAddress2: String,
        country: String,
        state: String,
        city: String,
        zipcode: String,
        type: String,
        personName : String
});

let orgModel = mongoose.model("orgModel", orgSchema);
module.exports = orgModel;