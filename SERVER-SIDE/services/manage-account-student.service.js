const CONFIG = require('../config.json');
const permissionStudent = CONFIG.permission.student;
const Student = require('../models/user');
const Q = require('q');
const bcrypt = require('bcryptjs');
const XLSX = require('xlsx');
const studentConfigFile = CONFIG.students;
const service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.importStudents =importStudents;
service.exportStudents = exportStudents;
service.delete = _delete;

module.exports = service;


function getAll() {
    var deferred = Q.defer();

    Student.find(
        { permission: permissionStudent },
        '-password -classSections' , 
        function  (err, students) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve(students);
        }
    )

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    // chua hoan chinh, can sua -> xem thong tin chi tiet ve sinh vien va cac lop hoc sv tham gia
    Student.findById( _id, '-password -classSections', (err, student) => {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(student);
    })

    return deferred.promise;
}

function create(studentParam) {
    var deferred = Q.defer();

    // validation
    Student.findOne(
        { username: studentParam.username },
        function (err, student) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (student) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createStudent();
            }
        }
    );

    function createStudent() {
        // set user object to studentParam without the cleartext password
        var student = studentParam;

        // add hashed password to student object
        student.password = bcrypt.hashSync(studentParam.password, 10);

        Student.create(
            student,
            function (err, user) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(user);
            }
        );
    }

    return deferred.promise;
}

function update( _id, studentParam) {
    var deferred = Q.defer();

    // validation
    Student.findById( _id, function (err, student) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (student.username !== studentParam.username) {
            // username has changed so check if the new username is already taken
            Student.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + studentParam.username + '" is already taken')
                    } else {
                        updateStudent();
                    }
                });
        } else {
            updateStudent();
        }
    });

    function updateStudent() {

        var student = studentParam;
        // update password if it was entered
        if (userParam.password) {
            student.password = bcrypt.hashSync(studentParam.password, 10);
        }

        Student.updateOne(
            { _id: _id },
            { $set: student },
            function (err, user) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(user);
            }
        );
    }

    return deferred.promise;
}

function importStudents (file){
    var deferred = Q.defer();

    try {
        // var workbook = XLSX.read(bstr, {type:"binary"});
        let workbook = XLSX.readFile('./../ds_tai_khoan_sinh_vien.xlsx');
        let sheet_name_list = workbook.SheetNames;
        let sheet = workbook.Sheets[sheet_name_list[0]];
        let range = sheet['!ref'];
        let rangeSet = studentConfigFile.rangeStart + ':' + range.split(':')[1];
        let students = XLSX.utils.sheet_to_json(sheet, {range: rangeSet, header: studentConfigFile.header});
        // dang viet tiep
        // insertMany
    } catch (err) {
        
    }

    return deferred.promise;
}

function exportStudents (file){
    var deferred = Q.defer();

    try {
        // var workbook = XLSX.read(bstr, {type:"binary"});
        let studentConfigFile = CONFIG.students;
        let workbook = XLSX.readFile('./../ds_tai_khoan_sinh_vien.xlsx');
        let sheet_name_list = workbook.SheetNames;
        let sheet = workbook.Sheets[sheet_name_list[0]];
        let range = sheet['!ref'];
        let rangeSet = studentConfigFile.rangeStart + ':' + range.split(':')[1];
        let students = XLSX.utils.sheet_to_json(sheet, {range: rangeSet, header: studentConfigFile.header});
        // dang viet tiep
        // insertMany
    } catch (err) {
        
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    User.deleteOne(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        }
    );

    return deferred.promise;
}