var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema classSection
 */
var ClassSection = new Schema({
	semester: String,
	idTeacher: {type: Schema.Types.ObjectId, ref: 'User'},
    time: String,
    location: String,
    code: String,
    name: String,
	creditNumber: Number,
    idStudents: [{type: Schema.Types.ObjectId, ref: 'User'}]
    // active: Boolean,
    // timestamp: Date
})
/**
 * name, Schema, collection
 */
var ClassSectionModel = mongoose.model('ClassSection', ClassSection, 'classSection');
/**
 * Exports
 */
module.exports = ClassSectionModel;