const timesheetModel = require("../models/timesheetsModel");

const timeSheetController = {};

timeSheetController.addTimesheet = (req, res) => {

    console.log("body", req.body)
    let timesheetData = {
        userId : req.body.userId._id,
        organizationId : req.body.userId.organization[0]._id,
        project : req.body.projectId,
        description : req.body.description,
        year : new Date().getFullYear(),
        events : []
    }

    timesheetData.save()
    .then(result => {
        console.log("result", result)
        
    })
    .catch(err => {
        console.log("err", err)
    })

}
module.exports = timeSheetController;