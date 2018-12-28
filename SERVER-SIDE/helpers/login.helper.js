var User = require('../models/user');
var jwt = require('./jwt.helper');
var bcrypt = require('bcryptjs');
var helper = {};

helper.login = login;

module.exports = helper;

async function login(param) {
    let user = await User.findOne({username: param.username});
    if(user){
        if(bcrypt.compareSync(param.password, user.password)){
            let token = await jwt.sign(user);
            return {
                permission: user.permission,
                token: token
            }
        } else {
            throw Error('Wrong password')
        }
    } else
        throw Error('Wrong username')
}
