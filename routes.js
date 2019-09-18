const express = require('express');
const router = express.Router();
const userController = require("./controllers/userController");
const orgController = require("./controllers/organizationController");
const vendorController = require("./controllers/vendor");
const clientController = require("./controllers/client");
const projController = require("./controllers/projectController");
const timesheetController = require("./controllers/timesheetController");


// User based routes
router.post("/userRegister", userController.userRegister);
router.post("/userLogin", userController.userLogin);
router.get("/getUsers", userController.getUsers);
router.get("/userAcitivate", userController.userAcitivate);

// Organization based routes
router.post("/addOrganization", orgController.addOrganization)
router.get("/getOrganizations", orgController.getOrganizations)
router.get("/getOrganizationByName", orgController.getOrganizationByName);
router.post("/deleteOrganization", orgController.deleteOrganization)

// Vendor based routes

router.post("/addVendor", vendorController.addVendor);
router.get("/getVendors", vendorController.getVendors);
router.get("/deleteVendors", vendorController.deleteVendors);


// Client based routes

router.post("/addClient", clientController.addClient);
router.get("/getClients", clientController.getClients);
router.get("/deleteClients", clientController.deleteClients);


// Project based routes

router.post("/addProject", projController.addProject);
router.get("/getProjects", projController.getProjcts);
router.post("/deleteProject", projController.deleteProject);
router.get("/getUserProjects", projController.getUserProjects);

// Timesheets

router.post("/addTimesheet", timesheetController.addTimesheet)
router.get("/allEvents", timesheetController.getAllEvents)
router.post("/upload", timesheetController.uploadDocuments)


module.exports = router;