const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

let userController = {}

userController.userRegister = async (req, res) => {

    let userData = new userModel({
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        organization : req.body.organization,
        email: req.body.data.email,
        role: req.body.role,
        createdAt: new Date,
        password: bcrypt.hashSync(req.body.data.password)
    })

    let result = await userData.save()
    res.send(result)

}

userController.userLogin = (req, res) =>{

    userModel.findOne({email : req.body.email}, (err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            if(data !== null){
                bcrypt.compare(req.body.password, data.password, function(err, hash) {
                    if(err){
                        console.log("err")
                    }
                    else{
                        if(hash){
                            var output = {
                                msg : "User login successfully",
                                condition : true,
                                userData : data
                            }
                            res.send(output)
                        }
                        else{
                            var output = {
                                msg : "The email address or password you entered is incorrect.",
                                condition : false
                            }
                            res.send(output) 
                        }
                    }
                    // res == false
                });
            }
            else{
                var output = {
                    msg : "The email address or password you entered is incorrect.",
                    condition : false
                }
                res.send(output)
            }
        }
    })
}

userController.getUsers = (req, res) => {

    if(req.query.id !== "undefined") {
        userModel.find({ 'organization.value' : req.query.id }, (err, allUsers) => {
            if(err) {
                res.send(err)
            }
            else {
                res.send(allUsers)
            }
        })
    }
    else {
        userModel.find({}, (err, allUsers) => {
            if(err) {
                res.send(err)
            }
            else {
                res.send(allUsers)
            }
        })
    }

  
}

module.exports = userController;