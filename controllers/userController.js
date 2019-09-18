const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

let userController = {}

userController.userRegister = async (req, res) => {

    let result = await userModel.findOne({ email: req.body.data.email })
    // console.log("result", result)
    if (result == null) {
        let userData = new userModel({
            firstName: req.body.data.firstName,
            lastName: req.body.data.lastName,
            organization: req.body.organization,
            email: req.body.data.email,
            role: req.body.role,
            createdAt: new Date,
            account: true,
            password: bcrypt.hashSync(req.body.data.password)
        })

        let result = await userData.save()
        let output = {
            msg: "User added successfully",
            condition: true
        }
        res.send(output)
    }
    else {
        let output = {
            msg: "Email already used.",
            condition: false
        }
        res.send(output)
    }
}

userController.userLogin = (req, res) => {

    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (data !== null) {
                bcrypt.compare(req.body.password, data.password, function (err, hash) {
                    if (err) {
                        console.log("err")
                    }
                    else {
                        if (hash) {
                            if (data.account) {
                                var output = {
                                    msg: "User login successfully",
                                    condition: true,
                                    userData: data
                                }
                                res.send(output)
                            }
                            else {
                                var output = {
                                    msg: "The email address or password you entered is incorrect.",
                                    condition: false
                                }
                                res.send(output)
                            }

                        }
                        else {
                            var output = {
                                msg: "The email address or password you entered is incorrect.",
                                condition: false
                            }
                            res.send(output)
                        }
                    }
                    // res == false
                });
            }
            else {
                var output = {
                    msg: "The email address or password you entered is incorrect.",
                    condition: false
                }
                res.send(output)
            }
        }
    })
}

userController.getUsers = (req, res) => {

    if (req.query.id !== "undefined") {
        userModel.find({ 'organization.value': req.query.id }, (err, allUsers) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(allUsers)
            }
        })
    }
    else {
        userModel.find({}, (err, allUsers) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send(allUsers)
            }
        })
    }


}

userController.userAcitivate = async (req, res) => {
    let result = await userModel.findOne({ _id: req.query.id })
    if (result.account) {
        let result = await userModel.updateOne({ _id: req.query.id }, { $set: { account: false } })
        res.send(result)
    }
    else {
        let result = await userModel.updateOne({ _id: req.query.id }, { $set: { account: true } })
        res.send(result)
    }

}

module.exports = userController;