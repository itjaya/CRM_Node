const express = require('express');
const router = express.Router();
const userController = require("./controllers/userController");
const orgController = require("./controllers/organizationController");
const vendorController = require("./controllers/vendor");
const clientController = require("./controllers/client");
// User based routes
router.post("/userRegister", userController.userRegister);
router.post("/userLogin", userController.userLogin);
router.get("/getUsers", userController.getUsers)

// Organization based routes
router.post("/addOrganization", orgController.addOrganization)
router.get("/getOrganizations", orgController.getOrganizations)

// Vendor based routes

router.post("/addVendor", vendorController.addVendor);
router.get("/getVendors", vendorController.getVendors);


// Client based routes

router.post("/addClient", clientController.addClient);
router.get("/getClients", clientController.getClients);


module.exports = router;