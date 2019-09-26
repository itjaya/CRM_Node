const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let wrkAuthSchema = new Schema({
    userId : String,
    documentType : String,
    documentNumber : String,
    dateIssued : String,
    validFrom : String,
    status : String,
    expiryDate : String,
    currentlyActive : String
});

let wrkAuthModel = mongoose.model("wrkAuthModel", wrkAuthSchema);
module.exports = wrkAuthModel;