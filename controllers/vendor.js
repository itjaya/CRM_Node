let vendorController = {};
const vendorModel = require('../models/vendorsModel');

vendorController.addVendor = (req, res) => {
    // console.log("haiii",req.body)
    let vendorStep1 = req.body.data.Business_Information.vendorStep1
    let vendorStep2 = req.body.data.Contact_Details.vendorStep2

    let obj = {
        organizationId: req.body.ordId,
        vendorName: vendorStep1.vendorName,
        contactNumber: vendorStep1.contactNo,
        emailId: vendorStep1.vendorEmail,
        addressStreet: vendorStep1.addressStreet,
        country: vendorStep1.country,
        state: vendorStep1.state,
        city: vendorStep1.city,
        zipcode: vendorStep1.zipcode,
        website: vendorStep1.website,
        category: vendorStep1.category,
        contacts: [{
            personName: vendorStep2.contactName,
            designation: vendorStep2.designation,
            emailId: vendorStep2.contactEmail,
            mobileNo: vendorStep2.mobileNo,
            address: vendorStep2.streetAddress,
            country: vendorStep2.country,
            state: vendorStep2.state,
            city: vendorStep2.city,
            zipcode: vendorStep2.zipcode,
            owner: vendorStep2.ownerPerson,
            linkedInUrl: vendorStep2.linkedInUrl,
            facebookUrl: vendorStep2.facebookUrl,
            twitterUrl: vendorStep2.twitterUrl
        }]
    }

    let vendorData = new vendorModel(obj)
    vendorData.save().then((respo) => {
        var output = {
            msg: "vendor added successfully.",
            condition: true
        }
        res.send(output)

    }).catch((err) => {
        var output = {
            msg: "vendor added failure.",
            condition: false
        }
        res.send(output)

    })
}

vendorController.getVendors = (req, res) =>{
    vendorModel.find({ organizationId : req.query.id}, (err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
}

vendorController.deleteVendors = (req, res) =>{
    // console.log(req.query)
    vendorModel.deleteOne({ _id : req.query.id}, (err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
}
module.exports = vendorController;