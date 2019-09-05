const orgModel = require('../models/organizationModel');
let orgController = {}

orgController.addOrganization = async (req, res) => {
    // console.log("body", req.body)

    let orgData = new orgModel(req.body);
    let result = await orgData.save();
    if(result._id) {
        res.send({
            msg: "Organization added successfully.",
            condition: true
        })
    }
    else {
        res.send({
            msg: "Error in adding organization.",
            condition: false
        })
    }
}

orgController.getOrganizations = async(req, res) => {

    let allData = await orgModel.find({})
    res.send(allData)
}

orgController.getOrganizationByName = async(req, res) => {
    let orgData = await orgModel.findOne({ organizationName:req.query.name })

    res.send(orgData)
}

module.exports = orgController;
