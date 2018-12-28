// var config = require('config.json');
const teacherHelper = require('../helpers/manage-account-teacher.helper');

var controller = {};

controller.getAll = getAll;
controller.create = create;
controller.getCurrent = getCurrent;
controller.update = update;
controller.importFile = importFile;
controller.exportFile = exportFile;
controller.find = find;
controller._delete = _delete;

module.exports = controller;

// function authenticate(req, res) {
//      teacherHelper.authenticate(req.body.username, req.body.password)
//         .then(function (user) {
//             if (user) {
//                 // authentication successful
//                 res.send(user);
//             } else {
//                 // authentication failed
//                 res.status(400).send('Username or password is incorrect');
//             }
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }

function getAll(req, res) {
    teacherHelper.getAll()
        .then(function (teachers) {
            res.send(teachers);
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

function create(req, res) {
    teacherHelper.create(req.body)
        .then(function (teacher) {
            // res.json('success');
            res.send(teacher);
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

function getCurrent(req, res) {
    teacherHelper.getById(req.params._id)
        .then(function (teacher) {
            if (teacher) {
                res.send(teacher);
            } else {
                res.sendStatus(404);
            }
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

function update(req, res) {
    teacherHelper.update(req.params._id, req.body)
        .then(function (teacher) {
            res.send(teacher);
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

function importFile (req, res) {
    teacherHelper.importTeachers(req.file.buffer)
        .then(function (teachers) {
            // res.json('success');
            res.send(teachers);
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

function exportFile(req, res) {
    teacherHelper.exportTeachers()
        .then(function (wbout) {
            let filename = "DsTaiKhoanCanBo.xlsx";
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
            res.type('application/octet-stream');
            res.send(wbout);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function find(req, res) {
    teacherHelper.find(req.body.keySearch)
        .then(function(teachers) {
            res.send(teachers);
        })
        .catch(function (err) {
            res.send({
                error: {
                    message: err.toString(),
                    code: 404
                }
            });;
        });
}

function _delete(req, res) {
    teacherHelper._delete(req.params._id)
        .then(function () {
            res.json('Đã xóa thành công');
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