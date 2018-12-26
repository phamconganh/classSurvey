var Teacher = require('../models/teacher');
var xlsxTeachers = require('./xlsx.helper');

var helper = {};

helper.getAll = getAll;
helper.getById = getById;
helper.create = create;
helper.update = update;
helper.importTeachers =importTeachers;
helper.exportTeachers = exportTeachers;
helper.find = find;
helper._delete = _delete;

module.exports = helper;

function getAll() {
    return Teacher.getAll();
}

function getById(_id) {
    return Teacher.getById(_id);
}

async function create(teacherParam) {
    let teacherCheck =  await Teacher.findUsername(teacherParam.username);
    if (teacherCheck)
        // username already exists
        throw Error({
            name: "Account conflict", 
            message: 'Username "' + teacherParam.username + '" is already taken'
        })
    else return await Teacher._create(teacherParam);
}

async function update(_id, teacherParam) {
    let teacherCheck = await Teacher.findById(_id);
    if(teacherCheck.username !== teacherParam.username){
        let teacherCheckUsername = await Teacher.findUsername(teacherParam.username);
        if(teacherCheckUsername)
            throw Error({
                name: "Account conflict", 
                message: 'Username "' + teacherParam.username + '" is already taken'
            })
        else {
            let teacher = await Teacher._update(_id, teacherParam);
            return await Teacher.getById(_id);
        }
    } else  {
        let teacher = await Teacher._update(_id, teacherParam);
        return await Teacher.getById(_id);
    }
}

async function importTeachers (file){
    let teachers = await xlsxTeachers.readTeachers(file);
    let arrayReject = [];
    let arrayResolve = [];
    let index = 0
    for(index; index<teachers.length; index++){
        teacher = teachers[index];
        try {
            teacher.username = teacher.code;
            teacher.password = teacher.password.toString();
            let teacherCheck =  await Teacher.findUsername(teacher.username);
            if (teacherCheck) {
                // username already exists
                let rejectMessage = {
                    name: "Account conflict", 
                    message: 'Username "' + teacher.username + '" is already taken'
                }
                arrayReject.push(rejectMessage);
            } else {
                let teacherData = await Teacher._create(teacher);
                arrayResolve.push(teacherData);
            }
        } catch (error) {
            arrayReject.push(error);
        }
    }
    if (index == teachers.length){
        return data = {
            dataRejects: arrayReject,
            dataResolves: arrayResolve
        }
    }
}

async function exportTeachers (){
    let teachers = await Teacher.getAll();
    return xlsxTeachers.writeTeachers(teachers);
}

function find(keySearch){
    return Teacher.findUser(keySearch);
}

function _delete(_id) {
    return Teacher._delete(_id);
}