const timesheetModel = require("../models/timesheetsModel");
const orgModel = require("../models/organizationModel")
const moment = require('moment');
const multer = require("multer");
const fs = require("fs");
const timeSheetController = {};
const path  = require("path")

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

timeSheetController.addTimesheet = async (req, res) => {

    // console.log("body", req.body)
    timesheetModel.findOne({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id }] }, async (err, data) => {
        if (err) {
            res.status(500).send("Error");
        }
        else {
            // console.log("data")
            let weekData = req.body.weekData;
            let monthNo = moment().month() + 1;
            let yearNo = moment().year();
            let weekNo = req.body.weekNo;
            let array = [];
            let submitArray = [];
            let oldEventsArray = [];

            for (var i = 0; i < weekData.length; i++) {
                if (weekData[i].title.length > 0) {

                    if(req.body.type === "submit") {
                        let obj = {
                            start: moment(new Date(weekData[i].date)).format("MM-DD-YYYY"),
                            end: moment(new Date(weekData[i].date)).format("MM-DD-YYYY"),
                            title: weekData[i].title,
                            weekNo: weekNo,
                            month: monthNo,
                            year: yearNo,
                            isAllDay: true,
                            lock: true
                        }
                        submitArray.push(obj);
                    }
                    else {
                        let obj = {
                            start: moment(new Date(weekData[i].date)).format("MM-DD-YYYY"),
                            end: moment(new Date(weekData[i].date)).format("MM-DD-YYYY"),
                            title: weekData[i].title,
                            weekNo: weekNo,
                            month: monthNo,
                            year: yearNo,
                            isAllDay: true,
                            lock: false
                        }
                        array.push(obj);
                    }
                    
                }
            }
            if (data.events.length > 0) {
                for (var j = 0; j < data.events.length; j++) {
                    oldEventsArray.push(data.events[j].start);
                }
                if(req.body.type === "submit") {
                    for (var k = 0; k < submitArray.length; k++) {
                        let newWeekDate = submitArray[k].start;
                        if (submitArray[k].title.length > 0) {
                            if (oldEventsArray.includes(newWeekDate)) {

                                try {
                                    await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id, "events.start": submitArray[k].start }] }, { $set: { "events.$": submitArray[k] } });
                                }
                                catch (error) { }
                            }
                            else {
                                try {
                                    await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id }] }, { $push: { events: submitArray[k] } });
                                }
                                catch (error) { }
                            }
                        }
                    }
                    res.send({
                        msg: "Timesheet data submitted successfully.",
                        condition: true
                    })
                }
                else {
                    for (var k = 0; k < array.length; k++) {
                        let newWeekDate = array[k].start
                        if (array[k].title.length > 0) {

                            if (oldEventsArray.includes(newWeekDate)) {
                                try {
                                    await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id, "events.start": array[k].start }] }, { $set: { "events.$": array[k] } });
                                }
                                catch (error) { }
                            }
                            else {
                                try {
                                    await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id }] }, { $push: { events: array[k] } });
                                }
                                catch (error) { }
                            }
                        }
                    }
                    res.send({
                        msg: "Timesheet data updated successfully.",
                        condition: true
                    })
                }
            }
            else {
                try {
                    await timesheetModel.updateOne({ "userId.value": req.body.userId._id }, { $push: { events: array } });
                    res.send({
                        msg: "Timesheet data added successfully.",
                        condition: true
                    })
                }
                catch (error) {
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
        // console.log("events", events)
        res.status(200).send(events)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

timeSheetController.uploadDocuments = async (req, res) => {
    console.log("query", req.query)
    let array = [];

    try {
        let result = await timesheetModel.findOne({ "userId.value": req.query.id });
        let orgResult = await orgModel.findOne({_id : result.organizationId});
        let date = moment(new Date(req.query.navigatedDate));
        var storage = multer.diskStorage({

            destination: function (req, file, cb) {

            let path  = './uploads/timesheets/'+ orgResult.organizationName;
            if(fs.existsSync(path)){
                let path_1 = path +'/'+result.userId.label;
                if(fs.existsSync(path_1)){
                    let path_2 = path_1 +'/'+ req.query.type;
                    if(fs.existsSync(path_2)){
                        let path_3 = path_2  +'/'+  date.year();
                        if(fs.existsSync(path_3)){
                            let path_4 = path_3  +'/'+ monthNames[date.month()];
                            if(fs.existsSync(path_4)){
                                let path_5 = path_4  +'/'+ date.week();
                                if(fs.existsSync(path_5)){
                                    cb(null, path_5)
                                }
                                else{
                                    let path_5 = path_4  +'/'+ date.week();
                                    fs.mkdir(path_5, (err) =>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            cb(null, path_5)
                                        }
                                    })
                                }
                            }
                            else{
                                let path_4 = path_3  +'/'+ monthNames[date.month()];
                                fs.mkdir(path_4, (err) =>{
                                    if(err) {
                                        console.log(err)
                                    }
                                    else{
                                        let path_5 = path_4  +'/'+ date.week();
                                        fs.mkdir(path_5, (err) =>{
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                cb(null, path_5)
                                            }
                                        })
                                    }
                                })
                            }
                        }
                        else{
                            let path_3 = path_2  +'/'+  date.year();
                            fs.mkdir(path_3, (err) => {
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    let path_4 = path_3  +'/'+ monthNames[date.month()];
                                    fs.mkdir(path_4, (err) =>{
                                        if(err) {
                                            console.log(err)
                                        }
                                        else{
                                            let path_5 = path_4  +'/'+ date.week();
                                            fs.mkdir(path_5, (err) =>{
                                                if(err){
                                                    console.log(err)
                                                }
                                                else{
                                                    cb(null, path_5)
                                                }
                                            })
                                        }
                                    })
                                }
                            })

                        }

                    }
                    else{
                        let path_2 = path_1 +'/'+ req.query.type;
                        fs.mkdir(path_2, (err) =>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                let path_3 = path_2  +'/'+  date.year();
                                fs.mkdir(path_3, (err) => {
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        let path_4 = path_3  +'/'+ monthNames[date.month()];
                                        fs.mkdir(path_4, (err) =>{
                                            if(err) {
                                                console.log(err)
                                            }
                                            else{
                                                let path_5 = path_4  +'/'+ date.week();
                                                fs.mkdir(path_5, (err) =>{
                                                    if(err){
                                                        console.log(err)
                                                    }
                                                    else{
                                                        cb(null, path_5)
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }

                }
                else{
                    let path_1 = path +'/'+ result.userId.label;
                    fs.mkdir(path_1, (err) =>{
                        if(err){

                        }
                        else{
                            let path_2 = path_1 +'/'+ req.query.type;
                            fs.mkdir(path_2, (err) =>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    let path_3 = path_2  +'/'+  date.year();
                                    fs.mkdir(path_3, (err) => {
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            let path_4 = path_3  +'/'+ monthNames[date.month()];
                                            fs.mkdir(path_4, (err) =>{
                                                if(err) {
                                                    console.log(err)
                                                }
                                                else{
                                                    let path_5 = path_4  +'/'+ date.week();
                                                    fs.mkdir(path_5, (err) =>{
                                                        if(err){
                                                            console.log(err)
                                                        }
                                                        else{
                                                            cb(null, path_5)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }
                            })
                        }
                    })
                }
            }
            else{
                fs.mkdir(path, (err) =>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        let path_1 = path +'/'+ result.userId.label;
                        fs.mkdir(path_1, (err) =>{
                            if(err){

                            }
                            else{
                                let path_2 = path_1 +'/'+ req.query.type;
                                fs.mkdir(path_2, (err) =>{
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        let path_3 = path_2  +'/'+  date.year();
                                        fs.mkdir(path_3, (err) => {
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                let path_4 = path_3  +'/'+ monthNames[date.month()];
                                                fs.mkdir(path_4, (err) =>{
                                                    if(err) {
                                                        console.log(err)
                                                    }
                                                    else{
                                                        let path_5 = path_4  +'/'+ date.week();
                                                        fs.mkdir(path_5, (err) =>{
                                                            if(err){
                                                                console.log(err)
                                                            }
                                                            else{
                                                               
                                                                cb(null, path_5)
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })

                                    }
                                })
                            }
                        })
                    }
                })

            }

            },
             filename: async function (req, file, callback) {
                    array.push(file)
                callback(null, result.userId.label +"_"+ date.year() +"_"+ monthNames[date.month()]+"_"+ date.week()+"_"+file.originalname);
            }
        })

        var upload = multer({ storage: storage }).array("file", 5);

        upload(req, res, async function (err) {

            if (err) {
                res.json(501)
            }
            else {
                console.log("body", req.body)
                let array = [];
                // array.push ({

                //     files : req.files,
                //     weekNo : req.body.weekNo,
                //     month : req.body.month,
                //     year : req.body.year

                // })
                // let result = await timesheetModel.updateOne({ uploads: array });
            }
        })
    }
    catch (err) {
        // console.log(err)
    }
  
}

timeSheetController.downloadtimesheet = async (req, res) => {
     var path1 = path.resolve(".") + "/" + req.query.data
    res.download(path1, req.query.filename, function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("success")
        }

    })

}
module.exports = timeSheetController;