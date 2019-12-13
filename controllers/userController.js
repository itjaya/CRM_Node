const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const SimpleCrypto = require("simple-crypto-js").default;


let userController = {}

userController.userRegister = async (req, res) => {
    if (req.body.id !== undefined) {
        // console.log(req.body)
        let updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        userModel.findOne({ $and: [{ "_id": req.body.id }, { "email": req.body.email }] }, function (err, result) {

            if (err) console.log(err)


            else if (result) {

                userModel.findOne({ $and: [{ "_id": { $ne: req.body.id } }, { "email": { $ne: req.body.email } }] }, function (err, result1) {

                    if (err) console.log(err)

                    else if (result1) {

                        userModel.updateOne({ '_id': req.body.id }, { $set: updateData }, function (err, result2) {

                            if (!err) {
                                if (result2.nModified == 0) {
                                    var output = {
                                        msg: "Your data not modified.",
                                        condition: true,
                                    }
                                    res.send(output)
                                }

                                else {
                                    userModel.findOne({ "_id": req.body.id }, function (err, result3) {
                                        if (!err) {
                                            var out = {
                                                msg: "Your data updated successfully.",
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
                userModel.findOne({ "email": req.body.email }, function (err, result4) {

                    if (err) console.log(err)

                    else {
                        if (result4 == null) {
                            userModel.updateOne({ '_id': req.body.id }, { $set: updateData }, function (err, result5) {

                                if (!err) {
                                    if (result5.nModified == 0) {
                                        var output = {
                                            msg: "Your data not modified",
                                            condition: true,
                                        }
                                        res.send(output)

                                    }
                                    else {
                                        userModel.findOne({ "_id": req.body.id }, function (err, result6) {
                                            if (!err) {
                                                condition = true;
                                                var out = {
                                                    msg: "Your data updated successfully.",
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
                                msg: "Email already exists.",
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

            let result = await userData.save();
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                // host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "ts.itideology@gmail.com",
                    pass: "Itideology123"
                }
            })
            // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
            var mailOptions = {
                from: '"It Ideology "<ts.itideology@gmail.com>', // sender address
                to: req.body.data.email, // list of receivers
                subject: 'itideology', // Subject line
                text: 'Hello world ?', // plaintext body
                html: '<p>Hi ' + req.body.data.firstName + ', </p><p>Welcome to My Reporting!</p><p>Your Username and Password are ' + req.body.data.email + '/' + req.body.data.password + ' </p>Please click below link to login to the application<br /><br /><a href="http://localhost:3000">Login</a><p>Regards,<br />My Reporting.</p>' // html body
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("error", error);
                }
                // console.log(info);
            });
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

}

userController.userLogin = (req, res) => {

    userModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            if (data !== null) {
                var simpleCrypto = new SimpleCrypto(config.encryptionKey);

                bcrypt.compare(req.body.password, data.password, function (err, hash) {
                    if (err) {
                        console.log("err")
                    }
                    else {
                        if (hash) {
                            if (data.account) {
                                let token = jwt.sign({ id: data._id}, config.secret, {expiresIn : 1000} );
                                let chiperText = simpleCrypto.encrypt(token);
                                var output = {
                                    msg: "User login successfully",
                                    condition: true,
                                    userData: data,
                                    token: chiperText
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

userController.userPasswordUpdate = async (req, res) => {
    // console.log("haiii", req.body)
    if (req.body.type === "reset") {
        await userModel.updateOne({ email: req.body.email }, { $set: { password: bcrypt.hashSync(req.body.password) } }, (err, update) => {
            if (err) console.log("err")
            else {
                let output = {
                    msg: "Password updated successfully.",
                    condition: true
                }
                res.send(output)
            }
        });
    }
    else {
        // console.log("haiiiii", req.body)
        let result = await userModel.findOne({ _id: req.body.id });
        bcrypt.compare(req.body.oldPassword, result.password, function (err, hash) {
            if (err) console.log("err")
            else {
                if (hash) {
                    userModel.updateOne({ _id: req.body.id }, { $set: { password: bcrypt.hashSync(req.body.password) } }, (err, update) => {
                        if (err) console.log(err)
                        else {
                            let output = {
                                msg: "Password Updated successfully.",
                                condition: true
                            }
                            res.send(output)
                        }
                    })
                }
                else {
                    let output = {
                        msg: "Old password didn't matched.",
                        condition: false
                    }
                    res.send(output)
                }
            }
        })

    }

}

userController.forgetPassword = async (req, res) => {
    // console.log(req.body)
    let Email = req.body.email;
    let result = await userModel.findOne({ email: req.body.email })
    // console.log("Ashok", result)
    if (result == null) {
        var output = {
            msg: "Invalid email please try it again.",
            condition: false
        }
        res.send(output)
    }
    else {

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            // host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "ts.itideology@gmail.com",
                pass: "Itideology123"
            }
        })
        // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
        var mailOptions = {
            from: '"It Ideology "<ts.itideology@gmail.com>', // sender address
            to: Email, // list of receivers
            subject: 'itideology', // Subject line
            text: 'Hello world ?', // plaintext body
            html: `<p>Hi ${result.firstName} </p>Please Click below link to reset password,<br/> <a href=http://localhost:3000/reset?${Email}>Reset Password</a><p>Regards,<br />It Ideology.</p>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error", error);
            }
            // console.log(info);
        });
        var output = {
            msg: "Please check your mail to reset password.",
            condition: true
        }
        res.send(output)

    }

}

module.exports = userController;