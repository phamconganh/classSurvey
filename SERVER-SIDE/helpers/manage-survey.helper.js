var ClassSection = require('../models/class-section');
var SurveyForm = require('../models/survey-form');

var helper = {};

helper.getAll = getAll;
helper.getById = getById;
helper.create = create;
helper.update = update;
// helper.importStudents =importStudents;
// helper.exportStudents = exportStudents;
helper.find = find;
helper._delete = _delete;

module.exports = helper;

function getAll() {
    return SurveyForm.getAll();
}

function getById(_id) {
    return SurveyForm.getById(_id);
}

async function create(param) {
    let checkClassSection = await ClassSection.findById(param.idClassSection);
}

async function update(_id, studentParam) {
    
}

function find(keySearch){
    return Student.findUser(keySearch);
}

function _delete(_id) {
    return Student._delete(_id);
}