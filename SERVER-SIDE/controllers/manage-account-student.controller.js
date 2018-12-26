// var config = require('config.json');
const studentHelper = require('../helpers/manage-account-student.helper');

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
//     studentHelper.authenticate(req.body.username, req.body.password)
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

    studentHelper.getAll()
        .then(function (students) {
            res.send(students);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    studentHelper.create(req.body)
        .then(function (student) {
            // res.json('success');
            res.send(student);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    studentHelper.getById(req.params._id)
        .then(function (student) {
            if (student) {
                res.send(student);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    studentHelper.update(req.params._id, req.body)
        .then(function (student) {
            res.send(student);
        })
        .catch(function (err) {
            console.log(err)
            res.status(400).send(err);
        });
}

function importFile (req, res) {
    studentHelper.importStudents(req.file.buffer)
        .then(function (students) {
            // res.json('success');
            res.send(students);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function exportFile(req, res) {
    studentHelper.exportStudents()
        .then(function (wbout) {
            let filename = "DsTaiKhoanSinhVien.xlsx";
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
    studentHelper.find(req.body.keySearch)
        .then(function(students) {
            res.send(students);
        })
        .catch(function (err) {
            res.status(404).send(err);
        });
}

function _delete(req, res) {
    studentHelper._delete(req.params._id)
        .then(function () {
            res.json('Đã xóa thành công');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}