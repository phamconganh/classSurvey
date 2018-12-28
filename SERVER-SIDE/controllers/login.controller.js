// var config = require('config.json');
const loginHelper = require('../helpers/login.helper');

var controller = {};

controller.login = login;

module.exports = controller;

function login(req, res) {
    loginHelper.login(req.body)
        .then(function (auth) {
            res.send(auth)
        })
        .catch(function (err) {
            res.send({
                error: {
                    message: err.toString(),
                    code: 400
                }
            });
        });
}