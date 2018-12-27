var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const CONFIG = require('../config.json');
const permission = CONFIG.permission;
/**
 * Schema classSection
 */
var ClassSection = new Schema({
	semester: String,
	// idTeacher: {type: Schema.Types.ObjectId, ref: 'User'},
	idTeacher: String,
    time: String,
    location: String,
    code: String,
    name: String,
	creditNumber: Number,
    // idStudents: [{type: Schema.Types.ObjectId, ref: 'User'}]
    idStudents: [String]
    // active: Boolean,
    // timestamp: Date
})

ClassSection.statics.getAll = function(param) {
    let match = {
		$match: {
			
		}
	}
	let lookupTeacher = {
		$lookup:{
			from: 'user',
			localField: 'idTeacher',
			foreignField: 'code',
			as: 'teacher'
		}
	}
	let unwind = {
		$unwind:"$idStudents"
	}
	let lookupStudent = {
		$lookup:{
			from: 'user',
			localField: 'idStudents',
			foreignField: 'code',
			as: 'students'
		}
	}
	let group = {
		$group: {
			"_id": "$_id",
			"semester": { "$first": "$semester" },
			"idStudents" :{"$push": "$idStudents"},
			"idTeacher": { "$first": "$idTeacher" },
			"time": { "$first": "$time" },
			"location": { "$first": "$location" },
			"code": { "$first": "$code" },
			"name": { "$first": "$name" },
			"creditNumber": { "$first": "$creditNumber" },
			"teacher": { "$first": "$teacher" },
			"students": { "$push": "$students" }
		}
	}
	if(param.permission == permission.teacher){
		match['$match'].idTeacher = param.code;
	} else if(param.permission == permission.student){
		match['$match'].idStudents = param.code;
	}
	return ClassSectionModel.aggregate([
		match, lookupTeacher, unwind, lookupStudent, group
	])
}

ClassSection.statics.getById = function(param) {
    let match = {
		$match: {
			_id: mongoose.Types.ObjectId(param._id)
		}
	}
	let lookupTeacher = {
		$lookup:{
			from: 'user',
			localField: 'idTeacher',
			foreignField: 'code',
			as: 'teacher'
		}
	}
	let unwind = {
		$unwind:"$idStudents"
	}
	let lookupStudent = {
		$lookup:{
			from: 'user',
			localField: 'idStudents',
			foreignField: 'code',
			as: 'students'
		}
	}
	let group = {
		$group: {
			"_id": "$_id",
			"semester": { "$first": "$semester" },
			"idStudents" :{"$push": "$idStudents"},
			"idTeacher": { "$first": "$idTeacher" },
			"time": { "$first": "$time" },
			"location": { "$first": "$location" },
			"code": { "$first": "$code" },
			"name": { "$first": "$name" },
			"creditNumber": { "$first": "$creditNumber" },
			"teacher": { "$first": "$teacher" },
			"students": { "$push": "$students" }
		}
	}
	if(param.permission == permission.teacher){
		match['$match'].idTeacher = param.code;
	} else if(param.permission == permission.student){
		match['$match'].idStudents = param.code;
	}
	return ClassSectionModel.aggregate([
		match, lookupTeacher, unwind, lookupStudent, group
	])
}

ClassSection.statics.findClass = function(param) {
	let search = {$regex: '.*' + param.keySearch + '.*', $options: 'i'};
	let match = {
		$match: {
			$or: [
				{code: search},
				{semester: search},
				{creditNumber: search},
                {name: search},
				{location: search},
				{time: search},
				{"teacher.code": search},
				{"teacher.fullname": search}
			]
		}
	}
	let lookup = {
		$lookup:{
			from: 'user',
			localField: 'idTeacher',
			foreignField: 'code',
			as: 'teacher'
		}
	}
	if(param.permission == permission.teacher){
		match['$match'].idTeacher = param.code;
	} else if(param.permission == permission.student){
		match['$match'].idStudents = param.code;
	}
	return ClassSectionModel.aggregate([
		lookup, match
	])
}

/**
 * name, Schema, collection
 */
var ClassSectionModel = mongoose.model('ClassSection', ClassSection, 'classSection');
/**
 * Exports
 */
module.exports = ClassSectionModel;