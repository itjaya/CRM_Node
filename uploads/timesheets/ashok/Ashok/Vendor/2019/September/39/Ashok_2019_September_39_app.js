var express = require("express");
var cors = require("cors")
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require("./controllers/routes");
var config = require("./database/config");
var database = require("./database/mongodb");
database();
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Type", "application/json");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
  app.use(routes)

app.listen(config.port, () => {
    console.log("server listening on port no" + " " + config.port)
})




