const timesheetModel = require("../models/timesheetsModel");
const orgModel = require("../models/organizationModel");
let usrModel = require("../models/userModel")
const moment = require('moment');
const multer = require("multer");
const fs = require("fs");
const timeSheetController = {};
const path  = require("path")
var nodemailer = require("nodemailer");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

timeSheetController.addTimesheet = async (req, res) => {
    
    let userEmail = await usrModel.findOne({ _id : req.body.userId._id});
    if(req.body.type === "submit") {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            // host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "ts.itideology@gmail.com",
                pass: "Itideology123"
            }
        })
        // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
        var mailOptions = {
            from: '"It Ideology "<ts.itideology@gmail.com>', // sender address
            to: userEmail.email, // list of receivers
            subject: 'itideology', // Subject line
            text: 'Hello world ?', // plaintext body
            html: '<p>Hi ' + userEmail.firstName + ', </p><p>Timesheet data</p>' // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error", error);
            }
            // console.log(info);
        });
    }
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
                        // console.log("haiiii")
                        array.push(obj);
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

            let obj = {
                weekNo : weekNo,
                year : yearNo,
                month : monthNo,
                description : req.body.description,
                dates : array
            }
            if (data.events.length > 0) {
                if(data.events.some(event => event.weekNo === weekNo && parseInt(event.year) === yearNo)) {
                    try {
                        await timesheetModel.updateMany({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id, events : { $elemMatch : { weekNo : weekNo, year : yearNo }} }] }, { $set: { "events.$": obj } }, (err, data4) => {
                            if(err) throw err;
                            res.send({
                                msg: "Timesheet data updated successfully.",
                                condition: true
                            })
    
                        });
                    }
                    catch (error) { }
                }
                else {
                    try {
                        timesheetModel.updateOne({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id }] }, { $push: { events: obj } }, (err, data5) => {
                            if(err) throw err;
                            res.send({
                                msg: "Timesheet data updated successfully.",
                                condition: true
                            })
                        });
                    }
                    catch (error) { }
                }
            }
            else {
                try {
                    await timesheetModel.updateOne({ $and: [{ project: req.body.projectId.value, "userId.value": req.body.userId._id }]}, { $push: { events: obj } });
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
        res.send([])
    }
}

timeSheetController.uploadDocuments = async (req, res) => {
    let array = [];

    try {
        let result = await timesheetModel.findOne({ "userId.value": req.query.id });
        let orgResult = await orgModel.findOne({_id : result.organizationId});
        let date = moment(new Date(req.query.navigatedDate));
        console.log("date", date.week())
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
                let array = [];
                let result1 = await timesheetModel.findOne({  $and: [{ "userId.value": req.query.id, project : req.body.projectId }] });
                if (result1.uploads.length > 0) {
                    if (result1.uploads.some(uploadData => uploadData.weekNo === req.body.weekNo && uploadData.month === req.body.month && uploadData.year === req.body.year)) {
                        timesheetModel.findOne({ $and: [{ "userId.value": req.query.id, project: req.body.projectId, "uploads.weekNo": req.body.weekNo, "uploads.year": req.body.year }] }, (err, data) => {
                            if (err) console.log(err);
                            array.push(...req.files)
                            for (let files of data.uploads) {
                                if (files.weekNo === req.body.weekNo) {
                                    array.push(...files.files)
                                }
                            }
                            timesheetModel.updateOne({ $and: [{ "userId.value": req.query.id, project: req.body.projectId, uploads : { $elemMatch : { weekNo : req.body.weekNo, year : req.body.year }} }] }, { $set: { "uploads.$.files": array } }, (err, data1) => {
                                if (err) console.log(err);
                                console.log("data1", data1)
                            });
                        });
                    } else {
                        array.push({
                            files: req.files,
                            weekNo: req.body.weekNo,
                            month: req.body.month,
                            year: req.body.year
                        })
                        timesheetModel.updateOne({ $and: [{ "userId.value": req.query.id, project: req.body.projectId }] }, { $push: { uploads: array } }, (err, data2) => {
                            if (err) console.log(err);
                            console.log("data2", data2)
                        });
                    }
                }
                else {
                    array.push({
                        files: req.files,
                        weekNo: req.body.weekNo,
                        month: req.body.month,
                        year: req.body.year
                    })
                    timesheetModel.updateOne({ $and: [{ "userId.value": req.query.id, project: req.body.projectId }] }, { $set: { uploads: array } }, (err, data3) => {
                        if (err) console.log(err);
                        console.log("data3", data3)
                    });
                }
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
