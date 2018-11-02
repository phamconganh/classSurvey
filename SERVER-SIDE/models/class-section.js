var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema classSection
 */
var ClassSection = new Schema({
    _id: String,
	semester: String,
	idTeacher: {type: String, ref: 'User'},
    time: String,
    location: String,
    code: String,
    name: String,
	creditNumber: Number,
    idStudents: [String] // ??? {type: String, ref: 'User'}
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