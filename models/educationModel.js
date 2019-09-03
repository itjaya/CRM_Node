const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let educationSchema = new Schema({
    userId : String,
    school : String,
    degree : String,
    yearCompleted : String,
    majorStudy : String,
    GPA : String,
    country : String,
    state : String,
    city: String
});

let educationModel = mongoose.model("educationModel", educationSchema);
module.exports = educationModel;