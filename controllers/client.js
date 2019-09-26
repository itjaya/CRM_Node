let clientController = {};
let clientModel = require("../models/clientsModel");

clientController.addClient = (req, res) => {
    let clientStep1 = req.body.clientStep1
    let clientStep2 = req.body.clientStep2

    let obj = {
        organizationId: req.body.ordId,
        clientName: clientStep1.clientName,
        contactNumber: clientStep1.contactNumber,
        emailId: clientStep1.emailId,
        addressStreet: clientStep1.addressStreet,
        country: clientStep1.country,
        state: clientStep1.state,
        city: clientStep1.city,
        zipcode: clientStep1.zipcode,
        website: clientStep1.website,
        fax: clientStep1.fax,


        contacts: [{
            personName: clientStep2.personName,
            designation: clientStep2.designation,
            emailId: clientStep2.emailId,
            mobileNo: clientStep2.mobileNo,
            streetAddress: clientStep2.streetAddress,
            country: clientStep2.country,
            state: clientStep2.state,
            city: clientStep2.city,
            zipcode: clientStep2.zipcode,
            owner: clientStep2.owner,
            linkedInUrl: clientStep2.linkedInUrl,
            facebookUrl: clientStep2.facebookUrl,
            twitterUrl: clientStep2.twitterUrl,
            officeNumber: clientStep2.officeNumber
        }]
    }
    if (req.body.clientStep1._id !== undefined) {
        clientModel.updateOne({ _id: req.body.clientStep1._id }, { $set: obj }, (err, update) => {
            if (!err) {
                var output = {
                    msg: "Client updated successfully.",
                    condition: true
                }
                res.send(output)
            }
            else {
                var output = {
                    msg: "Client updted failure.",
                    condition: false
                }
                res.send(output)
            }
        })
    }
    else {

        let clientData = new clientModel(obj)
        clientData.save().then((respo) => {
            var output = {
                msg: "Client added successfully.",
                condition: true
            }
            res.send(output)

        }).catch((err) => {
            var output = {
                msg: "Client added failure.",
                condition: false
            }
            res.send(output)

        })
    }
}

clientController.getClients = async(req, res) => {
    // console.log("haiiii", req.query)
    if (req.query.id !== "undefined") {
        let clients = await clientModel.find({ organizationId: req.query.id })
        res.send(clients)
    }
    else {
        let clients = await clientModel.find({})
        res.send(clients)
    }
}

clientController.deleteClients = (req, res) => {
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