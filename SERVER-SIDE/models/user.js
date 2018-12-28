var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var XLSX = require('xlsx');
/**
 * Schema user
 */
var User = new Schema({
	username: String,
	vnuEmail: String,
	password: String,
    code: String,
    fullname: String,
	// permission = 0 admin, 1 teacher, 2 user
	permission: Number,
    classSections: [{type: String, ref: 'ClassSection'}]
    // active: Boolean,
    // timestamp: Date
})

User.statics.getAll = function() {
    return this.find();
}

User.statics.getById = function(_id) {
    return this.findById(_id);
}

User.statics.findUser = function(keySearch) {
	let search = {$regex: '.*' + keySearch + '.*', $options: 'i'};
	return this.find({$or: [
		{code: search},
		{username: search},
		{vnuEmail: search},
		{fullname: search}
	]})
	// let lookupUser = {
	// 	$lookup:{
	// 		from: 'department',
	// 		localField: 'departmentId',
	// 		foreignField: '_id',
	// 		as: 'departmentId'
	// 	}
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

User.statics.findUsername = function(username) {
    return this.findOne({ username: username }, 'username');
}

User.statics._create = function(userParam){
    // set user object to userParam without the cleartext password
    let user = userParam;
    // add hashed password to user object
    user.password = bcrypt.hashSync(userParam.password, bcrypt.genSaltSync(10));
    return this.create(user);
}

User.statics._update = function( _id, userParam) {
	let user = userParam;
	// update password if it was entered
    if (userParam.password != null) {
        user.password = bcrypt.hashSync(userParam.password, bcrypt.genSaltSync(10));
    } else {
		delete user.password;
	}
    return this.findOneAndUpdate(
        { _id: _id },
        { $set: user }
    );
}

User.statics._delete = function(_id) {
    return this.deleteOne({ _id: _id });
}
/**
 * name, Schema, collection
 */
var UserModel = mongoose.model('User', User, 'user');
/**
 * Exports
 */
module.exports = UserModel;