// var config = require('config.json');
const express = require('express');
const router = express.Router();
const studentService = require('../services/manage-account-student.service');
const xlsxService = require('../services/xlsx.service')

// routes
router.get('/', getAll);
// router.post('/authenticate', authenticate);
router.post('/create', create);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.post('/import', importFile);
router.get('/export', exportFile);
router.post('/find', find);
router.delete('/:_id', _delete);

module.exports = router;

// function authenticate(req, res) {
//     studentService.authenticate(req.body.username, req.body.password)
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
    studentService.getAll()
        .then(function (students) {
            res.send(students);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    studentService.create(req.body)
        .then(function (student) {
            // res.json('success');
            res.send(student);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    studentService.getById(req.body._id)
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
    studentService.update(req.params._id, req.body)
        .then(function (student) {
            // res.json('success');
            res.send(student);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function importFile (req, res) {
    // studentService.importStudents(req.body)
    //     .then(function () {
    //         // res.json('success');
    //         res.send(students);
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });
}

function exportFile(req, res) {
    // studentService.exportStudents(req.body)
    //     .then(function () {
    //         // res.json('success');
    //         res.send(students);
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });
}

function find(req, res) {
    // studentService.exportStudents(req.body)
    //     .then(function () {
    //         // res.json('success');
    //         res.send(students);
    //     })
    //     .catch(function (err) {
    //         res.status(400).send(err);
    //     });
}

function _delete(req, res) {
    studentService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}