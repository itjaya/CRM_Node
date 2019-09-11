const timesheetModel = require("../models/timesheetsModel");
const moment = require('moment');

const timeSheetController = {};

timeSheetController.addTimesheet = async (req, res) => {

    // console.log("body", req.body)

    timesheetModel.findOne({ $and : [{ project : req.body.projectId.value, "userId.value" : req.body.userId._id }]}, async (err, data) => {
        if(err) {
            res.status(500).send("Error");
        }
        else {
            // console.log("data")
            let weekData = req.body.weekData;
            let monthNo = moment().month() + 1;
            let yearNo = moment().year();
            let weekNo = req.body.weekNo;
            let array = [];
            let oldEventsArray = [];

            for (var i = 0; i < weekData.length; i++) {
                // console.log(weekData[i])
                if(weekData[i].title.length > 0) {
                    let obj = {
                        start: moment(new Date(weekData[i].date)).format("MM-DD-YYYY"),
                        end: moment(new Date(weekData[i].date)).format("MM-DD-YYYY"),
                        title : weekData[i].title,
                        weekNo: weekNo,
                        month : monthNo,
                        year : yearNo,
                        isAllDay: true,
                        lock: false
                    }
    
                    array.push(obj)
                }
            }

            if (data.events.length > 0) {
                for (var j = 0; j < data.events.length; j++) {
                    oldEventsArray.push(data.events[j].start);
                }
                for (var k = 0; k < array.length; k++) {
                    let newWeekDate = array[k].start
                    if (oldEventsArray.includes(newWeekDate)) {

                        if(array[k].title.length > 0){
                        try {
                            await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id, "events.start": array[k].start }] }, { $set: { "events.$": array[k] } });
                        }
                        catch(error) {}
                    }
                    }
                    else {
                        if(array[k].title.length > 0){
                            try {
                                await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id }] }, { $push: { events: array[k] } });
                            }
                            catch(error) {}
                        }
                    }
                }
                res.send({
                    msg: "Timesheet data updated successfully.",
                    condition: true
                })

            }
            
            else {
                try {
                    await timesheetModel.updateOne({ "userId.value": req.body.userId._id }, { $push: { events: array } });
                    res.send({
                        msg: "Timesheet data added successfully.",
                        condition: true
                    })
                }
                catch(error){
                    res.send({
                        msg: "Timesheet data adding failed.",
                        condition: false
                    })
                }
            }

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