let clientController = {};
let clientModel = require("../models/clientsModel")
clientController.addClient = (req, res) =>{

    let obj = {
        organizationId : "asd",
        clientName : req.body.Business_Information.clientStep1.clientName,
        contactNumber : req.body.Business_Information.clientStep1.contactNumber,
        emailId : req.body.Business_Information.clientStep1.email,
        addressStreet : req.body.Business_Information.clientStep1.streetAddres,
        country : req.body.Business_Information.clientStep1.country,
        state : req.body.Business_Information.clientStep1.state,
        city : req.body.Business_Information.clientStep1.city,
        zipcode : req.body.Business_Information.clientStep1.zipcode,
        website : req.body.Business_Information.clientStep1.website,
        url : req.body.Business_Information.clientStep1.url,
        url1 : req.body.Business_Information.clientStep1.url1,

        contacts : [{
            personName : req.body.Contact_Details.clientStep2.contactName,
            designation : req.body.Contact_Details.clientStep2.designation,
            emailId : req.body.Contact_Details.clientStep2.email,
            mobileNo : req.body.Contact_Details.clientStep2.mobileNumber,
            address : req.body.Contact_Details.clientStep2.intstreetAddress,
            country : req.body.Contact_Details.clientStep2.country,
            state : req.body.Contact_Details.clientStep2.state,
            city : req.body.Contact_Details.clientStep2.city,
            zipcode : req.body.Contact_Details.clientStep2.zipCode,
            owner : req.body.Contact_Details.clientStep2.owner,
            linkedInUrl: req.body.Contact_Details.clientStep2.linkedInProfile,
            facebookUrl: req.body.Contact_Details.clientStep2.facebookProfile,
            twitterUrl: req.body.Contact_Details.clientStep2.twitterProfile,
            officeNumber : req.body.Contact_Details.clientStep2.officeNumber
        }]
    }
    let clientData = new clientModel(obj)
     clientData.save().then((respo) => {
        var output = {
            msg: "client added successfully.",
            condition: true
        }
        res.send(output)

    }).catch((err) => {
        var output = {
            msg: "client added failure.",
            condition: false
        }
        res.send(output)

    })

}

clientController.getClients = (req, res) =>{
    clientModel.find({}, (err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
}

module.exports = clientController