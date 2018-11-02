var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema user
 */
var User = new Schema({
    _id: String,
	username: String,
	vnuEmail: String,
	password: String,
    code: String,
    fullname: String,
    class: String,
	// permission = 0 admin, 1 teacher, 2 student
	permission: Number,
    classSections: [String]
    // classSection: {type: String, ref: 'ClassSection'}?????
    // active: Boolean,
    // timestamp: Date
})
/**
 * name, Schema, collection
 */
var UserModel = mongoose.model('User', User, 'user');
/**
 * Exports
 */
module.exports = UserModel;