
const config = require('../config.json');

var middleware = {};

middleware.admin = admin;
middleware.teacher = teacher;
middleware.student = student;
middleware.adminOrTeacher = adminOrTeacher;
middleware.adminOrTeacherOrStudent = adminOrTeacherOrStudent;

module.exports = middleware;

function admin(req, res, next){
    let check = false;
    if(req.paramAuth && req.paramAuth.permission == config.permission.admin
    ){
        check = true;
    }
    checkPermission(check, res, next);
}

function teacher(req, res, next){
    let check = false;
    if(req.paramAuth && req.paramAuth.permission == config.permission.teacher
    ){
        check = true;
    } 
    checkPermission(check, res, next);
}

function student(req, res, next){
    let check = false;
    if(req.paramAuth && req.paramAuth.permission == config.permission.student
    ){
        check = true;
    } 
    checkPermission(check, res, next);
}

function adminOrTeacher(req, res, next){
    let check = false;
    if(
        req.paramAuth &&
        (
            req.paramAuth.permission == config.permission.admin 
            || req.paramAuth.permission == config.permission.teacher
        )
    ){
        check = true;
    } 
    checkPermission(check, res, next);
}

function adminOrTeacherOrStudent(req, res, next){
    let check = false;
    if(
        req.paramAuth && 
        (
            req.paramAuth.permission == config.permission.admin 
            || req.paramAuth.permission == config.permission.teacher
            || req.paramAuth.permission == config.permission.student
        )
    ){
        check = true;
    }
    checkPermission(check, res, next);
}

function checkPermission(check, res, next){
    if(check){
        return next();
    } else{
        res.send({
            error: {
                message: Error('Permission denied').toString(),
                code: 400
            }
        })
    }
}