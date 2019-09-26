const orgModel = require('../models/organizationModel');
let orgController = {}


orgController.addOrganization = async (req, res) => {

    if (req.body._id) {
        orgModel.findOne({ "_id": req.body._id }, function (err, result) {

            if (err) console.log(err)


            else if (result) {

                orgModel.findOne({ "_id": req.body._id }, function (err, result1) {

                    if (err) console.log(err)

                    else if (result1) {

                        orgModel.updateOne({ '_id': req.body._id }, { $set: req.body }, function (err, result2) {

                            if (!err) {
                                if (result2.nModified == 0) {
                                    var output = {
                                        msg: "Organization data not modified.",
                                        condition: true,
                                    }
                                    res.send(output)
                                }

                                else {
                                    orgModel.findOne({ "_id": req.body._id }, function (err, result3) {
                                        if (!err) {
                                            var out = {
                                                msg: "Organization data updated successfully.",
                                                condition: true,
                                            }
                                            res.send(out);
                                        }
                                    });
                                }
                            }
                            else {

                                var out = {
                                    msg: 'update failed like did not matched id.',
                                    condition: false,
                                }
                                res.send(out);
                            }
                        });
                    }
                })
            }
            else {
                orgModel.findOne({ "_id": req.body._id }, function (err, result4) {

                    if (err) console.log(err)

                    else {
                        if (result4 == null) {
                            orgModel.updateOne({ '_id': req.body._id }, { $set: req.body }, function (err, result5) {

                                if (!err) {
                                    if (result5.nModified == 0) {
                                        var output = {
                                            msg: "Organization data not modified",
                                            condition: true,
                                        }
                                        res.send(output)

                                    }
                                    else {
                                        orgModel.findOne({ "_id": req.body._id }, function (err, result6) {
                                            if (!err) {
                                                condition = true;
                                                var out = {
                                                    msg: "Organization data updated successfully.",
                                                    condition: true,
                                                }
                                                res.send(out);
                                            }
                                        });
                                    }
                                } else {

                                    var out = {
                                        msg: 'update failed like did not matched id.',
                                        condition: false,
                                    }
                                    res.send(out);

                                }
                            });
                        }
                        else {
                            condition = false;
                            var out = {
                                msg: "Organization data exists.",
                                condition: false,
                            }
                            res.send(out);
                        }
                    }
                })
            }
        })
    }
    else {
        let org = await orgModel.findOne({ organizationName: req.body.organizationName })
        if (org !== null) {

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
        else {
            let output = {
                msg: "Organization name exists.",
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
