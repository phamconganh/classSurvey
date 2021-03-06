var Student = require('../models/student');
var xlsxStudents = require('./xlsx.helper');

var helper = {};

helper.getAll = getAll;
helper.getById = getById;
helper.create = create;
helper.update = update;
helper.importStudents =importStudents;
helper.exportStudents = exportStudents;
helper.find = find;
helper._delete = _delete;

module.exports = helper;

function getAll() {
    return Student.getAll();
}

function getById(_id) {
    return Student.getById(_id);
}

async function create(studentParam) {
    let studentCheck =  await Student.findUsername(studentParam.username);
    if (studentCheck)
        // username already exists
        throw Error('Username "' + studentParam.username + '" is already taken')
    else return await Student._create(studentParam);
}

async function update(_id, studentParam) {
    let studentCheck = await Student.findById(_id);
    if(studentCheck.username !== studentParam.username){
        let StudentCheckUsername = await Student.findUsername(studentParam.username);
        if(StudentCheckUsername)
            throw Error('Username "' + studentParam.username + '" is already taken')
        else {
            let student = await Student._update(_id, studentParam);
            return await Student.getById(_id);
        }
    } else  {
        let student = await Student._update(_id, studentParam);
        return await Student.getById(_id);
    }
}

async function importStudents (file){
    let students = await xlsxStudents.readStudents(file);
    let arrayReject = [];
    let arrayResolve = [];
    let index = 0
    for(index; index<students.length; index++){
        student = students[index];
        try {
            student.username = student.code;
            student.password = student.password.toString();
            let studentCheck =  await Student.findUsername(student.username);
            if (studentCheck) {
                // username already exists
                let rejectMessage = {
                    name: "Account conflict", 
                    message: 'Username "' + student.username + '" is already taken'
                }
                arrayReject.push(rejectMessage);
            } else {
                let studentData = await Student._create(student);
                arrayResolve.push(studentData);
            }
        } catch (error) {
            arrayReject.push(error);
        }
    }
    if (index == students.length){
        return data = {
            dataRejects: arrayReject,
            dataResolves: arrayResolve
        }
    }
}

async function exportStudents (){
    let students = await Student.getAll();
    return xlsxStudents.writeStudents(students);
}

function find(keySearch){
    return Student.findUser(keySearch);
}

function _delete(_id) {
    return Student._delete(_id);
}