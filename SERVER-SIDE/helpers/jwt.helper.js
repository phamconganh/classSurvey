var jwt = require('jsonwebtoken');
var config = require('../config.json');
var secretKey = config.secretKey;
var timeExpires  = config.timeExpires;

async function verify(token){
    return await jwt.verify(token, secretKey);
}

async function sign(data){
    return await jwt.sign({data}, secretKey, {expiresIn: timeExpires});
}

module.exports = {
    verify: verify,
    sign: sign
}