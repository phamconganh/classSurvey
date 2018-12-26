var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserModel = require('./user');
const CONFIG = require('../config.json');
const permissionStudent = CONFIG.permission.student;
/**
 * Schema student
 */
var Student = new Schema({
    class: String,
	permission: {type: Number, default: permissionStudent},
    // classSections: [{type: String, ref: 'ClassSection'}]
})

Student.statics.getAll = function() {
    return this.find(
        { permission: permissionStudent },
        '-password -classSections'
    );
}

Student.statics.getById = function(_id) {
	// let lookupStudent = {
	// 	$lookup:{
	// 		from: 'user',
	// 		localField: 'classSections',
	// 		foreignField: 'idStudents',
	// 		as: 'classSections'
	// 	}
    // }
	// let match = {
	// 	$match: {
	// 		id: _id
	// 	}
	// }
	// if (typeFind == config.doctor){
	// 	match['$match']['$or'].push(
	// 		{'departmentId._id': search},
	// 		{'departmentId.name': search}
	// 	);
	// }
	// return this.aggregate([lookupStudent,match]);
    return this.findById( _id, '-password -classSections');
}
Student.statics.findUser = function(keySearch) {
	let search = {$regex: '.*' + keySearch + '.*', $options: 'i'};
	return this.find(
		{
			$or: [
				{code: search},
				{username: search},
				{vnuEmail: search},
				{fullname: search}
			],
			permission: permissionStudent
		},
		'-password -classSections'
	)
}
/**
 * name, Schema
 */
var StudentModel = UserModel.discriminator('Student', Student);

/**
 * Exports
 */
module.exports = StudentModel;