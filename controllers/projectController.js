const projModel = require('../models/projectModel');

const projController = {};

projController.addProject = async(req, res) => {
    console.log("body", req.body)
    let clientData = req.body

    let projectData = new projModel({
        userId : clientData.user,
        organizationId : clientData.organization,
        clientId : clientData.clientDetails,
        vendorId : clientData.vendorDetails,
        projectName : clientData.data.projectName,
        startDate : clientData.data.projectStartDate,  
        endDate : clientData.data.projectEndDate,
        street1 : clientData.data.street1,
        street2 : clientData.data.street2,
        country : clientData.data.country,
        state : clientData.data.state,
        city : clientData.data.city,
        zipcode : clientData.data.zipcode
    })

    let result = await projectData.save();
    // console.log("resulu", result)
    res.send(result)
}

projController.getProjcts = async(req, res) => {

    // console.log("query", req.query)
    if(req.query.id !== "undefined") {

        let projects = await projModel.find({ organizationId : req.query.id })
        res.send(projects)
    }
}

module.exports = projController;