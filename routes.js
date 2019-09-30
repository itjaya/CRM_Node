const express = require('express');
const router = express.Router();
const verifyToken = require('./config/verifyToken');

const userController = require("./controllers/userController");
const orgController = require("./controllers/organizationController");
const vendorController = require("./controllers/vendor");
const clientController = require("./controllers/client");
const projController = require("./controllers/projectController");
const timesheetController = require("./controllers/timesheetController");
const addressController = require("./controllers/address");

// User based routes
router.post("/userRegister", userController.userRegister);
router.post("/userLogin", userController.userLogin);
router.get("/getUsers", verifyToken, userController.getUsers);
router.get("/userAcitivate", verifyToken, userController.userAcitivate);
router.post("/passwordUpdate", userController.userPasswordUpdate);
router.post("/forgetPassword", userController.forgetPassword);

// Organization based routes
router.post("/addOrganization",verifyToken, orgController.addOrganization)
router.get("/getOrganizations",verifyToken, orgController.getOrganizations)
router.get("/getOrganizationByName",verifyToken, orgController.getOrganizationByName);
router.post("/deleteOrganization",verifyToken, orgController.deleteOrganization)

// Vendor based routes

router.post("/addVendor",verifyToken, vendorController.addVendor);
router.get("/getVendors", verifyToken,vendorController.getVendors);
router.get("/deleteVendors",verifyToken, vendorController.deleteVendors);


// Client based routes

router.post("/addClient",verifyToken, clientController.addClient);
router.get("/getClients", verifyToken,clientController.getClients);
router.get("/deleteClients", verifyToken,clientController.deleteClients);


// Project based routes

router.post("/addProject",verifyToken, projController.addProject);
router.get("/getProjects",verifyToken, projController.getProjcts);
router.post("/deleteProject",verifyToken, projController.deleteProject);
router.get("/getUserProjects",verifyToken, projController.getUserProjects);

// Timesheets

router.post("/addTimesheet",verifyToken, timesheetController.addTimesheet);
router.get("/allEvents",verifyToken, timesheetController.getAllEvents);
router.post("/upload", verifyToken,timesheetController.uploadDocuments);
router.get("/downloadtimesheet", verifyToken,timesheetController.downloadtimesheet);

// Address

router.post("/addAddress",verifyToken, addressController.addAddress)
router.get("/getusersDetails",verifyToken, addressController.getusersDetails)

module.exports = router;