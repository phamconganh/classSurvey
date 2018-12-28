var ClassSection = require('../models/class-section');
var Teacher = require('../models/teacher');
var Survey = require('../models/survey');
var xlsxSurveyClass = require('./xlsx.helper');

var helper = {};

helper.getAll = getAll;
helper.getById = getById;
helper.updateByImport = updateByImport;
helper.update = update;
helper.importSurveyClass = importSurveyClass;
// helper.exportTeachers = exportTeachers;
helper.find = find;
helper._delete = _delete;

module.exports = helper;

function getAll(param) {
    return ClassSection.getAll(param);
}

function getById(param) {
    return ClassSection.getById(param);
}

async function updateByImport(_id, file) {
    let surveyClass = await xlsxSurveyClass.readClassSections(file);
    let teacherCheck = await Teacher.findOne({code: surveyClass.idTeacher});
    if(teacherCheck == null){
        throw new Error('Teacher code "' + surveyClass.idTeacher + '" is not exit')
    } else {
        let classSectionCheck = await ClassSection.find({code: surveyClass.code, semester: surveyClass.semester})
        if(classSectionCheck == null) {
            throw Error('Class section "' + surveyClass.code + '" in semester "' + surveyClass.semester + '" is not exist')
        }
        else if(classSectionCheck.length > 1){
            throw Error('Class section "' + surveyClass.code + '" in semester "' + surveyClass.semester + '" is conflict')
        }
        else {
            return await ClassSection.findOneAndUpdate(
                { _id: _id },
                { $set: surveyClass }
            )
        }
    }
}

async function update(param) {
    let teacherCheck = await Teacher.findOne({code: param.idTeacher});
    if(teacherCheck){
        let classSectionCheck = await ClassSection.find({code: param.code, semester: param.semester})
        if(classSectionCheck == null) {
            throw Error('Class section "' + surveyClass.code + '" in semester "' + surveyClass.semester + '" is not exist')
        }
        else if(classSectionCheck.length > 1)
            throw Error('Class section "' + param.code + '" in semester "' + param.semester + '" is conflict')
        else {
            let updateParam = {
                code: param.code,
                semester: param.semester,
                idTeacher: param.idTeacher,
                time: param.time,
                location: param.location,
                name: param.name,
                creditNumber: param.creditNumber
            };
            // dang tra ve du lieu trc khi update
            return await ClassSection.findOneAndUpdate(
                { _id: param._id },
                { $set: updateParam }
            )
        }
    } else  {
        throw new Error('Teacher code "' + surveyClass.idTeacher + '" is not exit')
    }
}

async function importSurveyClass (file){
    let surveyClass = await xlsxSurveyClass.readClassSections(file);
    let teacherCheck = await Teacher.findOne({code: surveyClass.idTeacher});
    if(teacherCheck == null){
        throw new Error('Teacher code "' + surveyClass.idTeacher + '" is not exit')
    } else {
        let classSectionCheck = await ClassSection.findOne({code: surveyClass.code, semester: surveyClass.semester})
        if(classSectionCheck){
            throw Error('Class section "' + surveyClass.code + '" in semester "' + surveyClass.semester + '" is conflict')
        }
        else {
            return ClassSection.create(surveyClass);
        }
    }
}

// async function exportTeachers (){
//     let teachers = await Teacher.getAll();
//     return xlsxTeachers.writeTeachers(teachers);
// }

function find(param){
    return ClassSection.findClass(param);
}

async function _delete(_id) {
    // await SurveyForm.deleteMany({idClassSection: _id});
    await Survey.deleteMany({idClassSection: _id});
    let classSectionDelete = await ClassSection.deleteOne({_id: _id});
    if(classSectionDelete.n > 0){
        return "success";
    } else {
        throw Error('Class section is not exist')
    }
}