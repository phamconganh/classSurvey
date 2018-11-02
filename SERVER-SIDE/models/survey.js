var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema survey
 */
var Survey = new Schema({
    // _id: String,
	// semester: String,
	// idTeacher: {type: String, ref: 'User'},
    // time: String,
    // location: String,
    // code: String,
    // name: String,
	// creditNumber: Number,
    // idStudents: [String] // ??? {type: String, ref: 'User'}
    // active: Boolean,
    // timestamp: Date
})
/**
 * name, Schema, collection
 */
var SurveyModel = mongoose.model('Survey', Survey, 'survey');
/**
 * Exports
 */
module.exports = SurveyModel;