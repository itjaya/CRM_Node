const orgModel = require('../models/organizationModel');
let orgController = {}

orgController.addOrganization = async (req, res) => {
    // console.log("body", req.body)
    try {
        let orgData = new orgModel(req.body);
        await orgData.save();
        let output = {
            msg: "Organization added successfully.",
            condition: true
        };
        res.send(output)
    }
    catch (error) {
        let output = {
            msg: "Error in adding organization.",
            condition: false
        }
        res.send(output)
    }
}

orgController.getOrganizations = async(req, res) => {

    let allData = await orgModel.find({})
    res.send(allData)
}

orgController.getOrganizationByName = async(req, res) => {``
    let orgData = await orgModel.findOne({ organizationName:req.query.name })

    res.send(orgData)
}

module.exports = orgController;
