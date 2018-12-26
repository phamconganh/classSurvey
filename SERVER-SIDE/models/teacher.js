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

Teacher.statics.findUser = function(keySearch) {
	let search = {$regex: '.*' + keySearch + '.*', $options: 'i'};
	return this.find(
		{
			$or: [
				{code: search},
				{username: search},
				{vnuEmail: search},
				{fullname: search}
			],
			permission: permissionTeacher
		},
		'-password -classSections'
	)
}
/**
 * name, Schema
 */
var TeacherModel = UserModel.discriminator('Teacher', Teacher);

/**
 * Exports
 */
module.exports = TeacherModel;