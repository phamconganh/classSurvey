var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config.json');
var type = config.type;
/**
 * Schema SurveyForm
 */
var SurveyForm = new Schema({
    isActive: Boolean,
    createdAt: String,
    modifiedAt: String,
    idClassSection: String,
    // semester: String,
    data: [{
        section: String,
        dataSection: [{
            question: String,
            answer: String
        }]
    }],
    type: Number
})
SurveyForm.statics.getAll = function() {
    let match = {
        $match: {
            type: type.custom
        }
    }
	let lookupClassSection = {
		$lookup:{
			from: 'classSection',
			localField: 'idClassSection',
			foreignField: '_id',
			as: 'classSection'
		}
	}
	let lookupTeacher = {
		$lookup:{
			from: 'user',
			localField: 'classSection.idTeacher',
			foreignField: 'code',
			as: 'teacher'
		}
	}
	return SurveyFormModel.aggregate([
		match, lookupClassSection, lookupTeacher
	])
}

SurveyForm.statics.getById = function(_id) {
	let match = {
        $match: {
            _id: mongoose.Types.ObjectId(_id)
        }
    }
	let lookupClassSection = {
		$lookup:{
			from: 'classSection',
			localField: 'idClassSection',
			foreignField: '_id',
			as: 'classSection'
		}
	}
	let lookupTeacher = {
		$lookup:{
			from: 'user',
			localField: 'classSection.idTeacher',
			foreignField: 'code',
			as: 'teacher'
		}
	}
	return SurveyFormModel.aggregate([
		match, lookupClassSection, lookupTeacher
	])
}

SurveyForm.statics.findSurvey = function(keySearch) {
	let search = {$regex: '.*' + keySearch + '.*', $options: 'i'};
	let match = {
		$match: {
			$or: [
				{"classSection.code": search},
				{"classSection.semester": search},
				{"classSection.reditNumber": search},
                {"classSection.name": search},
				{"classSection.location": search},
				{"classSection.time": search},
				{"classSection.teacher.code": search},
				{"classSection.teacher.fullname": search}
			]
		}
	}
	let lookupClassSection = {
		$lookup:{
			from: 'classSection',
			localField: 'idClassSection',
			foreignField: '_id',
			as: 'classSection'
		}
	}
	let lookupTeacher = {
		$lookup:{
			from: 'user',
			localField: 'classSection.idTeacher',
			foreignField: 'code',
			as: 'teacher'
		}
	}
	return SurveyFormModel.aggregate([
		lookupClassSection, lookupTeacher, match
	])
}
/**
 * name, Schema, collection
 */
var SurveyFormModel = mongoose.model('SurveyForm', SurveyForm, 'surveyForm');
/**
 * Exports
 */
module.exports = SurveyFormModel;