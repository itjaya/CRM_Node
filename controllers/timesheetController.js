const timesheetModel = require("../models/timesheetsModel");
const moment = require('moment');

const timeSheetController = {};

timeSheetController.addTimesheet = (req, res) => {

    // console.log("body", req.body)

    timesheetModel.findOne({ $and : [{ project : req.body.projectId.value, "userId.value" : req.body.userId._id }]}, (err, data) => {
        if(err) {
            res.status(500).send("Error");
        }
        else {
            // console.log("data", data)
            let weekData = req.body.weekData;
            let monthNo = moment().month() + 1;
            let yearNo = moment().year();
            let weekNo = moment().week();
            let array = [];

            for (var i = 0; i < weekData.length; i++) {
                let obj = {
                    start: weekData[i].date,
                    end: weekData[i].date,
                    title : weekData[i].hours,
                    weekNo: weekNo,
                    month : monthNo,
                    year : yearNo,
                    isAllDay: true,
                    lock: false
                }
                array.push(obj)
            }
            timesheetModel.updateOne({ "userId.value": req.body.userId._id }, { $push: { events: array } }, (error, update) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(update)
                }
            })
        }
    })
}

timeSheetController.getAllEvents = async (req, res) => {

    try {
        let events = await timesheetModel.findOne({ $and: [{ "userId.value": req.query.userId }, { project: req.query.project.value }] });
        res.status(200).send(events)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports = timeSheetController;