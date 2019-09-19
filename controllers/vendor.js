let vendorController = {};
const vendorModel = require('../models/vendorsModel');

vendorController.addVendor = (req, res) => {
    // console.log("haiii",req.body)
    let vendorStep1 = req.body.data.Business_Information.vendorStep1
    let vendorStep2 = req.body.data.Contact_Details.vendorStep2

    let obj = {
        organizationId: req.body.ordId,
        vendorName: vendorStep1.vendorName,
        contactNumber: vendorStep1.contactNumber,
        emailId: vendorStep1.emailId,
        addressStreet: vendorStep1.addressStreet,
        country: vendorStep1.country,
        state: vendorStep1.state,
        city: vendorStep1.city,
        zipcode: vendorStep1.zipcode,
        website: vendorStep1.website,
        category: vendorStep1.category,
        contacts: [{
            personName: vendorStep2.personName,
            designation: vendorStep2.designation,
            emailId: vendorStep2.emailId,
            mobileNo: vendorStep2.mobileNo,
            country: vendorStep2.country,
            state: vendorStep2.state,
            city: vendorStep2.city,
            zipcode: vendorStep2.zipcode,
            owner: vendorStep2.owner,
            linkedInUrl: vendorStep2.linkedInUrl,
            facebookUrl: vendorStep2.facebookUrl,
            twitterUrl: vendorStep2.twitterUrl,
            officeNo: vendorStep2.officeNo,
            streetAddress: vendorStep2.streetAddress
        }]
    }
    // console.log("haiii", obj)
    if (req.body.data._id !== undefined) {
        vendorModel.updateOne({ _id: req.body.data._id }, { $set: obj }, (err, update) => {
            if (!err) {
                var output = {
                    msg: "Vendor updated successfully.",
                    condition: true
                }
                res.send(output)
            }
            else {
                var output = {
                    msg: "Vendor updted failure.",
                    condition: false
                }
                res.send(output)
            }
        })
    }
    else {
        let vendorData = new vendorModel(obj)
        vendorData.save().then((respo) => {
            var output = {
                msg: "Vendor added successfully.",
                condition: true
            }
            res.send(output)

        }).catch((err) => {
            var output = {
                msg: "Vendor added failure.",
                condition: false
            }
            res.send(output)

        })
    }

}

vendorController.getVendors = async (req, res) => {
   
    if (req.query.id !== "undefined") {
        let vendors = await vendorModel.find({ organizationId: req.query.id })
        res.send(vendors)
    }
    else {
        let vendors = await vendorModel.find({})
        res.send(vendors)
    }
}

vendorController.deleteVendors = (req, res) => {
    // console.log(req.query)
    vendorModel.deleteOne({ _id: req.query.id }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data)
        }
    })
}
module.exports = vendorController;