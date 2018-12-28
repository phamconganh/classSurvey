// var config = require('config.json');
const surveyClassHelper = require('../helpers/manage-survey-class.helper');
const permission = require('../config.json').permission;

var controller = {};

controller.getAll = getAll;
controller.updateByImport = updateByImport;
controller.getCurrent = getCurrent;
controller.update = update;
controller.importFile = importFile;
// controller.exportFile = exportFile;
controller.find = find;
controller._delete = _delete;

module.exports = controller;

function getAll(req, res) {
    surveyClassHelper.getAll(req.paramAuth)
        .then(function(classSurvey) {
            res.send(classSurvey);
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

function updateByImport(req, res) {
    surveyClassHelper.updateByImport(req.body._id, req.file.buffer)
        .then(function (classSurvey) {
            // res.json('success');
            res.send(classSurvey);
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
    req.paramAuth._id = req.params._id;
    surveyClassHelper.getById(req.paramAuth)
        .then(function(classSurvey) {
            if (classSurvey) {
                res.send(classSurvey);
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
    if(req.paramAuth.permission == permission.admin){
        surveyClassHelper.update(req.body)
            .then(function (surveyClass) {
                res.send(surveyClass);
            })
            .catch(function (err) {
                res.send({
                    error: {
                        message: err.toString(),
                        code: 400
                    }
                });
            });
    } else
        res.send({
            error: {
                message: Error('Permission denied').toString(),
                code: 400
            }
        });
}

function importFile(req, res) {
    if(req.paramAuth.permission == permission.admin){
        surveyClassHelper.importSurveyClass(req.file.buffer)
            .then(function (surveyClass) {
                res.send(surveyClass);
            })
            .catch(function (err) {
                res.send({
                    error: {
                        message: err.toString(),
                        code: 400
                    }
                });
            });
    } else
        res.send({
            error: {
                message: Error('Permission denied').toString(),
                code: 400
            }
        });
}

// function exportFile(req, res) {
//     surveyClassHelper.exportTeachers()
//         .then(function (wbout) {
//             let filename = "DsTaiKhoanCanBo.xlsx";
//             res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//             res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
//             res.type('application/octet-stream');
//             res.send(wbout);
//         })
//         .catch(function (err) {
//             res.status(400).send(err);
//         });
// }

function find(req, res) {
    req.paramAuth.keySearch = req.body.keySearch;
    surveyClassHelper.find(req.paramAuth)
        .then(function(surveyClass) {
            res.send(surveyClass);
        })
        .catch(function (err) {
            res.send({
                error: {
                    message: err.toString(),
                    code: 404
                }
            });
        });
}

function _delete(req, res) {
    if(req.paramAuth.permission == permission.admin){
        surveyClassHelper._delete(req.params.id)
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
    } else
        res.send({
            error: {
                message: Error('Permission denied').toString(),
                code: 400
            }
        });
}