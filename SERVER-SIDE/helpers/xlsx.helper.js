var XLSX = require('xlsx');
const CONFIG = require('../config.json');

var helper = {};

helper.readStudents = readStudents;
helper.writeStudents = writeStudents;
helper.readTeachers = readTeachers;
helper.writeTeachers = writeTeachers;
helper.readClassSections = readClassSections;
helper.writeClassSections = writeClassSections;
helper.readSurveyForm = readSurveyForm;
helper.writeResult = writeResult;

module.exports = helper;

function readStudents(file){
    try {
        let studentConfig = CONFIG.students;
        let workbook = XLSX.read(file)
        let sheet_name_list = workbook.SheetNames;
        let sheet = workbook.Sheets[sheet_name_list[0]];
        let range = sheet['!ref'];
        let rangeSet = studentConfig.rangeStart + ':' + range.split(':')[1];
        let data = XLSX.utils.sheet_to_json(sheet, {range: rangeSet, header: studentConfig.header})
        for (let index = 0; index < data.length; index++) {
            for(let key of Object.keys(data[index])){
                data[index][key] = data[index][key].toString().trim();
            }
        }
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}

function writeStudents(){

}

function readTeachers(){
    try {
        let teacherConfig = CONFIG.teachers;
        let workbook = XLSX.readFile('./../ds_tai_khoan_canbo.xlsx');
        let sheet_name_list = workbook.SheetNames;
        let sheet = workbook.Sheets[sheet_name_list[0]];
        let range = sheet['!ref'];
        let rangeSet = teacherConfig.rangeStart + ':' + range.split(':')[1];
        return XLSX.utils.sheet_to_json(sheet, {range: rangeSet, header: teacherConfig.header})
    } catch (error) {
        throw error
    }
}

function writeTeachers(){
    let workbook = XLSX.readFile('./../ds_tai_khoan_canbo.xlsx');
    const sheet_name_list = workbook.SheetNames;
    // console.log(sheet_name_list);
    console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
}

function readClassSections(){
    try {
        let vector = CONFIG.classSectionsVector;
        let workbook = XLSX.readFile('./../Danh_sach_sinh_vien_lop_mon_hoc.xlsx');
        let sheet_name_list = workbook.SheetNames;
        let sheet = workbook.Sheets[sheet_name_list[0]];
        let range = XLSX.utils.decode_range(sheet['!ref']);
        let data = {};
        data.semester = sheet[XLSX.utils.encode_cell({r: vector.semester.r, c: vector.semester.c})].v;
        data.idTeacher = sheet[XLSX.utils.encode_cell({r: vector.idTeacher.r, c: vector.idTeacher.c})].v;
        data.time = sheet[XLSX.utils.encode_cell({r: vector.time.r, c: vector.time.c})].v;
        data.location = sheet[XLSX.utils.encode_cell({r: vector.location.r, c: vector.location.c})].v;
        data.code = sheet[XLSX.utils.encode_cell({r: vector.code.r, c: vector.code.c})].v;
        data.name = sheet[XLSX.utils.encode_cell({r: vector.name.r, c: vector.name.c})].v;
        data.creditNumber = sheet[XLSX.utils.encode_cell({r: vector.creditNumber.r, c: vector.creditNumber.c})].v;
        data.idStudents = [];
        for(let rowNum = 11; rowNum <= range.e.r; rowNum++){
            nextCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: vector.idStudents.c})];
            if( typeof nextCell !== 'undefined' ){
                data.idStudents.push(nextCell.v);
            }
        }
        return data;
    } catch (error) {
        throw error
    }
}

function writeClassSections(){

}

function readSurveyForm(){

}

function writeResult(){

}
// console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
