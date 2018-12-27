var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema SurveyForm
 */
var SurveyForm = new Schema({
    isActive: Boolean,
    createdAt: String,
    modifiedAt: String,
    groupClassSection: String,
    semester: String,
    data: [{
        section: String,
        dataSection: [{
            question: String,
            answer: String
        }]
    }]
    // active: Boolean,
    // timestamp: Date
})
/**
 * name, Schema, collection
 */
var SurveyFormModel = mongoose.model('SurveyForm', SurveyForm, 'surveyForm');
/**
 * Exports
 */
module.exports = SurveyFormModel;