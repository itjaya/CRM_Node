const express = require('express');
const router = express.Router();
const userController = require("./controllers/userController")
const orgController = require("./controllers/organizationController")

// User based routes
router.post("/userRegister", userController.userRegister);
router.post("/userLogin", userController.userLogin);
router.get("/getUsers", userController.getUsers)

// Organization based routes
router.post("/addOrganization", orgController.addOrganization)
router.get("/getOrganizations", orgController.getOrganizations)

module.exports = router;