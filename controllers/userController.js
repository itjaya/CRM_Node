const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var nodemailer = require("nodemailer");

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
                html : '<table style="border-collapse:collapse;table-layout:fixed;margin:0 auto;border-spacing:0;padding:0;height:100%!important;width:100%!important;font-weight:normal;color:#3e4152;font-family:"roboto",Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4"; height="100%" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="background:#ffffff;padding:16px 0"><table style="max-width:600px;margin:auto;border-spacing:0;background:#673ab7;padding:4px;border-radius:16px;overflow:hidden" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">          <tbody><tr>     <td style="border-collapse:collapse">               <table style="margin:auto;border-spacing:0;background:white;border-radius:12px;overflow:hidden" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">                       <tbody><tr>         <td style="border-collapse:collapse">                           <table style="border-spacing:0;border-collapse:collapse" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%">                      <tbody><tr>                 <td style="border-collapse:collapse;padding:16px 32px" align="left" valign="middle">                                  <table style="border-spacing:0;border-collapse:collapse" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="padding:0;text-align:left;border-collapse:collapse" width="40" align="left" valign="middle"><a href="http://noreply.phonepe.com/wf/click?upn=XXzsL-2Fg46kqP73RA836Q3OHuEqObUIgUldo9I-2BhBhTc-3D_UNiN-2FWvCVFd4wyLXFv4tTXoLlyq3lDEhWDRsYQ-2F4hjMshgTpVInNFDYVregQT4-2B3B7mE-2B6GmC8TbEWrrGkngv7GRz3f2CO2eZmZe2xL10Z7K6ZK9UymaxG8yg2vF3qI6E1fJ9w-2BHP5flJ4510KTV-2BJrXjQQnpC3bdSLly1PJON8v9uT1U4e-2BAmr6UMp2EgciwJnoUk2s2i3UVs74TuLBwvzLkdADcauQy0AUQ9kdJgq4oN9r68KwizEeKAop1b8rryfXw-2FrjWO40hI-2FZsjh2bY2IkJdH4XqIaKEfUguc6bWkwHHLATNPj5u3wdL-2BKLPcmxC4i-2BE1UaAFCr1Ffp7yQw-3D-3D" style="text-decoration:none;color:#ffffff;outline:0;outline:none;border:0;border:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://noreply.phonepe.com/wf/click?upn%3DXXzsL-2Fg46kqP73RA836Q3OHuEqObUIgUldo9I-2BhBhTc-3D_UNiN-2FWvCVFd4wyLXFv4tTXoLlyq3lDEhWDRsYQ-2F4hjMshgTpVInNFDYVregQT4-2B3B7mE-2B6GmC8TbEWrrGkngv7GRz3f2CO2eZmZe2xL10Z7K6ZK9UymaxG8yg2vF3qI6E1fJ9w-2BHP5flJ4510KTV-2BJrXjQQnpC3bdSLly1PJON8v9uT1U4e-2BAmr6UMp2EgciwJnoUk2s2i3UVs74TuLBwvzLkdADcauQy0AUQ9kdJgq4oN9r68KwizEeKAop1b8rryfXw-2FrjWO40hI-2FZsjh2bY2IkJdH4XqIaKEfUguc6bWkwHHLATNPj5u3wdL-2BKLPcmxC4i-2BE1UaAFCr1Ffp7yQw-3D-3D&amp;source=gmail&amp;ust=1569997497711000&amp;usg=AFQjCNEwRRcFI5MC2XX8d1UKUi8FQyFmAA">                     <img src="https://ci3.googleusercontent.com/proxy/hgMqkK-FvRq7P_igffWjiC1KJV_aenYwHN3WfdzMsOd2Thf7nhK6p3nomvtNGgM6YZEuO0TnCm1EjN0TGJt83NgcIQRX-SVl47oUsWrI-xHfHpY=s0-d-e1-ft#http://images.phonepe.com/images/emailers/96/96/phonepe_logo.png" title="PhonePe" alt="PhonePe" style="margin:auto;text-align:center;border:0;outline:none;text-decoration:none;min-height:40px" align="middle" border="0" width="40" class="CToWUd">                     </a>                     </td>                                               <td width="16" align="left" valign="middle" style="border-collapse:collapse">&nbsp;</td>                                                               <td align="right" valign="middle">                     Oct 1, 2019                     </td>                                          </tr>                 </tbody></table>                                  </td>             </tr>                      </tbody></table>                  </td>         </tr>                                    <tr>         <td style="border-collapse:collapse;padding:0 16px">                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background:#f7f9fa;padding:16px;border-radius:8px;overflow:hidden">                                                               <tbody><tr>                                 <td align="left" valign="middle" style="border-collapse:collapse;padding-bottom:16px;border-bottom:1px solid #eaeaed">                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">                                     <tbody><tr>                                     <td align="left" valign="top" style="border-collapse:collapse;text-transform:capitalize">                                         <span style="border-collapse:collapse;width:100%;display:block">                                         Received from                                         </span>                                         <span style="border-collapse:collapse;font-size:16px;font-weight:500;width:100%;display:block">                                          THIRUNAGARI SRUJAN                                          </span>                                     </td>                                     <td width="32" align="left" valign="middle" style="border-collapse:collapse"></td>                 <td align="right" valign="middle" style="border-collapse:collapse;font-size:20px;font-weight:500">₹ 3000</td> </tr>                                     </tbody></table>                                 </td>                             </tr>                                                                                            <tr>                                 <td align="left" valign="middle" style="border-collapse:collapse;padding:8px 0;border-bottom:1px solid #eaeaed;font-size:12px">                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">                                     <tbody><tr>                                     <td width="28%" align="left" valign="top" style="border-collapse:collapse;text-transform:capitalize">Txn. ID</td>                                     <td width="16" align="left" valign="top" style="border-collapse:collapse;font-weight:normal">:</td>                                     <td align="left" valign="top" style="border-collapse:collapse;font-weight:normal">                                     P1910010810593166391913                                     </td>                                     </tr>                                     </tbody></table>                                 </td>                             </tr>                                                                                            <tr>                                 <td align="left" valign="middle" style="border-collapse:collapse;padding:8px 0;border-bottom:1px solid #eaeaed;font-size:12px">                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">                                     <tbody><tr>                                     <td width="28%" align="left" valign="top" style="border-collapse:collapse;text-transform:capitalize">Txn. status</td>                                     <td width="16" align="left" valign="top" style="border-collapse:collapse;font-weight:normal">:</td>                                                                          <td align="left" valign="top" style="border-collapse:collapse;font-weight:normal;font-size:16px;color:#5eaa46">Successful</td>                                                                          </tr>                                     </tbody></table>                                 </td>                             </tr>                                                                                            <tr>                                 <td align="left" valign="middle" style="border-collapse:collapse;padding:8px 0;border-bottom:1px solid #eaeaed;font-size:12px">                                     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">                                     <tbody><tr>                                     <td width="28%" align="left" valign="top" style="border-collapse:collapse;text-transform:capitalize">                                     Credited to                                     </td>                                     <td width="16" align="left" valign="top" style="border-collapse:collapse;font-weight:normal">:</td>                                                                          <td align="left" valign="top" style="border-collapse:collapse;font-weight:normal;font-size:12px">                                     <span style="border-collapse:collapse;font-size:16px;width:100%;display:block">                                     XXXXXX7409                                     </span>                                     <span style="border-collapse:collapse;width:100%;font-weight:normal;display:block">                                     HDFC Bank                                     </span>                                     </td>                                                                          </tr>                                     </tbody></table>                                 </td>                             </tr>                                                                                            <tr><td align="left" valign="middle" style="border-collapse:collapse;padding:8px 0;border-bottom:1px solid #eaeaed;font-size:12px"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="28%" align="left" valign="top" style="border-collapse:collapse;text-transform:capitalize">'
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