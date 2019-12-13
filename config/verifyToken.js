const jwt = require('jsonwebtoken');
const config = require('./config');
const SimpleCrypto = require("simple-crypto-js").default;
const simpleCrypto = new SimpleCrypto(config.encryptionKey);


module.exports = function (req, res, next) {

    console.log("header", req.headers)

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (token !== undefined) {
        let verifiedToken = simpleCrypto.decrypt(token)

        if (verifiedToken) {
            // verifies secret and checks exp
            jwt.verify(verifiedToken, config.secret, function (err, decoded) {
                if (err) {
                }
                req.decoded = decoded;
                next(); //no error, proceed
            });
        } else {
            res.send("Unauthorized");
        }
    }
    else {

        res.send("Invalid Token")
    }
}