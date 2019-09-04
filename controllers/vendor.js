let vendorController = {};
const vendorModel = require('../models/vendorsModel');

vendorController.addVendor = (req, res) => {
    // console.log("haiii",req.body.Contact_Details.vendorStep2)
    let obj = {
        organizationId: "ashok",
        vendorName: req.body.Business_Information.vendorStep1.vendorName,
        contactNumber: req.body.Business_Information.vendorStep1.contactNo,
        emailId: req.body.Business_Information.vendorStep1.vendorEmail,
        addressStreet: req.body.Business_Information.vendorStep1.addressStreet,
        country: req.body.Business_Information.vendorStep1.country,
        state: req.body.Business_Information.vendorStep1.state,
        city: req.body.Business_Information.vendorStep1.city,
        zipcode: req.body.Business_Information.vendorStep1.zipcode,
        website: req.body.Business_Information.vendorStep1.website,
        category: req.body.Business_Information.vendorStep1.category,
        contacts: {
            personName: req.body.Contact_Details.vendorStep2.contactName,
            designation: req.body.Contact_Details.vendorStep2.designation,
            emailId: req.body.Contact_Details.vendorStep2.contactEmail,
            mobileNo: req.body.Contact_Details.vendorStep2.mobileNo,
            address: req.body.Contact_Details.vendorStep2.streetAddress,
            country: req.body.Contact_Details.vendorStep2.country,
            state: req.body.Contact_Details.vendorStep2.state,
            city: req.body.Contact_Details.vendorStep2.city,
            zipcode: req.body.Contact_Details.vendorStep2.zipcode,
            owner: req.body.Contact_Details.vendorStep2.ownerPerson,
            linkedInUrl: req.body.Contact_Details.vendorStep2.linkedInUrl,
            facebookUrl: req.body.Contact_Details.vendorStep2.facebookUrl,
            twitterUrl: req.body.Contact_Details.vendorStep2.twitterUrl
        }
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
    vendorModel.find({}, (err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
}
module.exports = vendorController;