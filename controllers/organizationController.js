const orgModel = require('../models/organizationModel');
let orgController = {}

orgController.addOrganization = async (req, res) => {
    // console.log("body", req.body)

    if(req.body._id) {
        try {
            await orgModel.updateOne({ _id : req.body._id }, { $set : req.body })
            let output = {
                msg: "Organization data updated successfully.",
                condition: true
            };
            res.send(output)
        }
        catch (error) {
            let output = {
                msg: "Error in updating organization data.",
                condition: false
            }
            res.send(output)
        }
    }
    else {
        try {
            let orgData = new orgModel(req.body);
            await orgData.save();
            let output = {
                msg: "Organization data added successfully.",
                condition: true
            };
            res.send(output)
        }
        catch (error) {
            let output = {
                msg: "Error in adding organization data.",
                condition: false
            }
            res.send(output)
        }
    }
   
}

orgController.getOrganizations = async(req, res) => {

    let allData = await orgModel.find({})
    res.send(allData)
}

orgController.getOrganizationByName = async(req, res) => {``
    let orgData = await orgModel.findOne({ organizationName:req.query.name })
    res.send(orgData);
}

orgController.deleteOrganization = async(req, res) => {

    if(req.query.id !== "undefined") {
        try {
            await orgModel.deleteOne({ _id : req.query.id })
            var output = {
                msg: "Organization data deleted successfully.",
                condition: true
            }
            res.status(200).send(output)
        }
        catch(error) {
            var output = {
                msg: "Error in deleting organization data.",
                condition: false
            }
            res.status(400).send(output)
        }
    }
}

module.exports = orgController;
