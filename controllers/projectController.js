const projModel = require('../models/projectModel');
const timesheetModel = require('../models/timesheetsModel');
const usrModel = require("../models/userModel")
var nodemailer = require("nodemailer");

const projController = {};

projController.addProject = async(req, res) => {
    // console.log("body", req.body)
    let clientData = req.body

    let projectData = {
        userId: clientData.user,
        organizationId: clientData.organization,
        clientId: clientData.clientDetails,
        vendorId: clientData.vendorDetails,
        projectName: clientData.data.projectName,
        startDate: clientData.data.projectStartDate,
        endDate: clientData.data.projectEndDate,
        street1: clientData.data.street1,
        street2: clientData.data.street2,
        country: clientData.data.country,
        state: clientData.data.state,
        city: clientData.data.city,
        zipcode: clientData.data.zipcode
    }

    if (req.body.projectId && req.body.projectId !== "undefined") {

        projModel.updateOne({ _id : req.body.projectId }, { $set : projectData }, (err, result) => {
            if(err) {
                var output = {
                    msg: "Error in project update.",
                    condition: false
                }
                res.status(400).send(output)
            }
            else {
                var output = {
                    msg: "Project updated successfully.",
                    condition: true
                }
                res.status(200).send(output)
            }
        })
    }
    else {
        let project = new projModel(projectData)
        try {
            let prjResult = await project.save();
            let userEmail = await usrModel.findOne({ _id : clientData.user.value});
            // console.log("Email", userEmail.email)
            let timeSheetData = {
                userId : clientData.user,
                organizationId : clientData.organization,
                project : prjResult._id,
                prjStartDate : prjResult.startDate,
                prjEndDate : prjResult.endDate,
                year : new Date().getFullYear(),
                events : []         
            }
            let timesheets = new timesheetModel(timeSheetData);
            await timesheets.save();
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
                html: '<p>Hi ' + clientData.user.label + ', </p><p>project data</p>' // html body
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error", error);
                }
                // console.log(info);
            });
            var output = {
                msg: "Project added successfully.",
                condition: true
            }
            res.status(200).send(output)
        }
        catch(error) {
            var output = {
                msg: "Error in adding project.",
                condition: false
            }
            res.status(400).send(output)
        }
    }
}

projController.getProjcts = async(req, res) => {

    // console.log("query", req.query)
    if(req.query.id !== "undefined") {

        let projects = await projModel.find({ organizationId : req.query.id })
        res.send(projects)
    }
    else{
        let projects = await projModel.find({ })
        res.send(projects)
    }
}

projController.deleteProject = async(req, res) => {

    if(req.query.id !== "undefined") {
        try {
            await projModel.deleteOne({ _id : req.query.id })
            var output = {
                msg: "Project deleted successfully.",
                condition: true
            }
            res.status(200).send(output)
        }
        catch(error) {
            var output = {
                msg: "Error in deleting project.",
                condition: false
            }
            res.status(400).send(output)
        }
    }
}

projController.getUserProjects = async (req, res) => {

    let userProjects = await projModel.find({ "userId.value" : req.query.id })
    // console.log(userProjects)
    res.send(userProjects)
}

module.exports = projController;