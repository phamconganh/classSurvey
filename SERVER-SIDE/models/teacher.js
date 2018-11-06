var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserModel = require('./user');
const CONFIG = require('../config.json');
const permissionTeacher = CONFIG.permission.teacher;
/**
 * Schema Teacher
 */
var Teacher = new Schema({
	permission: {type: Number, default: permissionTeacher},
    // classSections: [{type: String, ref: 'ClassSection'}]
})
Teacher.statics.getAll = function() {
    return this.find(
        { permission: permissionTeacher },
        '-password -classSections'
    );
}

Teacher.statics.getById = function(_id) {
    // chua hoan chinh, can sua -> xem thong tin chi tiet ve sinh vien va cac lop hoc sv tham gia
    return this.findById( _id, '-password -classSections');
}
Teacher.statics.findUser = function(searchParam) {
    // let search = {$regex: '.*' + searchParam.data + '.*', $options: 'i'};
	// let lookupTeacher = {
	// 	$lookup:{
	// 		from: 'user',
	// 		localField: 'classSections',
	// 		foreignField: 'idTeachers',
	// 		as: 'classSections'
	// 	}
    // }
    // let rules = [];
    // for (let i=0; i<searchParam.rules.length; i++){
    //     rules.push({searchParam.rules[i]: })
    // }
	// let match = {
	// 	$match: {
	// 		$or: [
	// 			{_id: search},
	// 			{name: search},
	// 			{card: search},
	// 			{phoneNumber: search},
	// 			{userName: search},
	// 			{address: search},
	// 			{level: search},
	// 			{experience: search},
	// 			{token: search}
	// 		]
	// 	}
	// }
	// if (objectType != config.admin){
	// 	match['$match'].active = true;
	// }
	// if (typeFind != config.admin){
	// 	match['$match'].objectType = typeFind;
	// }
	// if (typeFind == config.doctor){
	// 	match['$match']['$or'].push(
	// 		{'departmentId._id': search},
	// 		{'departmentId.name': search}
	// 	);
	// }
	// return this.aggregate([lookupDepartment,match]).sort({_id: 1});
}
/**
 * name, Schema
 */
var TeacherModel = UserModel.discriminator('Teacher', Teacher);

/**
 * Exports
 */
module.exports = TeacherModel;