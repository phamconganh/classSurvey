var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema survey
 */
var Survey = new Schema({
	idClassSection: {type: Schema.Types.ObjectId, ref: 'Student'},
	createdAt: String,
    modifiedAt: String,
    idSurveyForm: {type: Schema.Types.ObjectId, ref: 'SurveyForm'},
    data: [String]
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