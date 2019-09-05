let clientController = {};
let clientModel = require("../models/clientsModel");

clientController.addClient = (req, res) => {
    console.log(req.body.data.Business_Information)
    // let clientStep1 = req.body.data.Business_Information.clientStep1
    // let clientStep2 = req.body.data.Contact_Details.clientStep2

    // let obj = {
    //     organizationId: req.body.ordId,
    //     clientName: clientStep1.clientName,
    //     contactNumber: clientStep1.contactNumber,
    //     emailId: clientStep1.email,
    //     addressStreet: clientStep1.streetAddres,
    //     country: clientStep1.country,
    //     state: clientStep1.state,
    //     city: clientStep1.city,
    //     zipcode: clientStep1.zipcode,
    //     website: clientStep1.website,

    //     contacts: [{
    //         personName: clientStep2.contactName,
    //         designation: clientStep2.designation,
    //         emailId: clientStep2.email,
    //         mobileNo: clientStep2.mobileNumber,
    //         address: clientStep2.intstreetAddress,
    //         country: clientStep2.country,
    //         state: clientStep2.state,
    //         city: clientStep2.city,
    //         zipcode: clientStep2.zipCode,
    //         owner: clientStep2.owner,
    //         linkedInUrl: clientStep2.linkedInProfile,
    //         facebookUrl: clientStep2.facebookProfile,
    //         twitterUrl: clientStep2.twitterProfile,
    //         officeNumber: clientStep2.officeNumber
    //     }]
    // }
    // let clientData = new clientModel(obj)
    // clientData.save().then((respo) => {
    //     var output = {
    //         msg: "client added successfully.",
    //         condition: true
    //     }
    //     res.send(output)

    // }).catch((err) => {
    //     var output = {
    //         msg: "client added failure.",
    //         condition: false
    //     }
    //     res.send(output)

    // })

}

clientController.getClients = (req, res) => {
    clientModel.find({ organizationId : req.query.id}, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data)
        }
    })
}

clientController.deleteClients = (req, res) =>{
    clientModel.deleteOne({ _id: req.query.id }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(data)
        }
    })
}

module.exports = clientController