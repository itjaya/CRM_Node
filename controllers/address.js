let addressController = {};

let addModel = require("../models/addressModel");
let eduModel = require("../models/educationModel");
let perModel = require("../models/personalDetails")

addressController.addAddress = async (req, res) => {

    if (req.body.type === "Personal") {
        // console.log("ASHOK", req.body)
        let result = await perModel.find({ userId: req.body.id });
        // console.log("haiiii", result)

        let obj = {
            userId: req.body.id,
            jobTitle: req.body.JobTitle,
            alternateEmailId: req.body.Email,
            dateOfJoining: req.body.doj,
            gender: req.body.Gender,
            phoneNo: req.body.PhoneNo,
            SSN: req.body.SSN,
            dateOfBirth: req.body.dob,
            visaType: req.body.VisaType,
            country: req.body.country,
            state: req.body.State,
            maritalStatus: req.body.MaritalStatus,
            payrollId: req.body.PayrollId
        }
        // console.log(obj)
        if (result.length > 0) {
            await perModel.updateOne({ userId: req.body.id }, { $set: obj }, (err, update) => {
                if (err) console.log(err)
                else {
                    let output = {
                        msg: "Personal details updated successfully",
                        condition: true
                    }
                    res.send(output)
                }
            })
        }
        else {
            try {
                let perData = new perModel(obj);
                await perData.save();
                let output = {
                    msg: "Personal details added successfully",
                    condition: true
                }
                res.send(output)
    
            }
            catch(error) {
                let output = {
                    msg: "Personal details added failure",
                    condition: false
                }
                res.send(output)
            }
        }

    }
    if (req.body.type === "Education") {
        let obj = {
            userId: req.body.id,
            school: req.body.University,
            degree: req.body.Degree,
            yearCompleted: req.body.YearOfEnd,
            yearJoining: req.body.YearOfJoin,
            GPA: req.body.GPA,
            country: req.body.Country,
            state: req.body.State,
            city: req.body.City,
            courses: req.body.Courses
        }
        try {
            let eduData = new eduModel(obj);
            await eduData.save();
            let output = {
                msg: "Education details added successfully",
                condition: true
            }
            res.send(output)

        }
        catch(error) {
            let output = {
                msg: "Education details added failure",
                condition: false
            }
            res.send(output)
        }
    }
    if (req.body.type === "Address") {
        let obj = {
            userId: req.body.id,
            street1: req.body.Street_1,
            country: req.body.Country,
            state: req.body.State,
            city: req.body.City,
            zipcode: req.body.Zipcode,
            startDate: req.body.addressEndDate,
            endDate: req.body.addressStartDate,
            active: req.body.Active
        }
        try {
            let addData = new addModel(obj);
            await addData.save();
            let output = {
                msg: "Address details added successfully",
                condition: true
            }
            res.send(output)

        }
        catch(error) {
            let output = {
                msg: "Address details added failure",
                condition: false
            }
            res.send(output)
        }
    }
}

addressController.getusersDetails = async (req, res) => {
    // console.log("haiii", req.query)
    let addDetails = await addModel.find({ userId: req.query.id });
    let eduDetails = await eduModel.find({ userId: req.query.id });
    let perDetails = await perModel.find({ userId: req.query.id });

    // console.log("addDetails", addDetails)
    // console.log("eduDetails", eduDetails)
    // console.log("perDetails", perDetails)
    let obj = {
        addDetails: addDetails,
        eduDetails: eduDetails,
        perDetails: perDetails
    }
    res.send(obj)

}
module.exports = addressController; 