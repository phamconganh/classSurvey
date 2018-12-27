var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var config = require('./config.json');
mongoose.connect(config.db);

var SurveyForm = new Schema({
    isActive: Boolean,
    createdAt: String,
    modifiedAt: String,
    idClassSection: String,
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

var SurveyFormModel = mongoose.model('SurveyForm', SurveyForm, 'surveyForm');

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

var ClassSectionModel = mongoose.model('ClassSection', ClassSection, 'classSection');

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
let lookupStudent = {
    $lookup:{
        from: 'user',
        localField: 'idStudents',
        foreignField: 'code',
        as: 'students'
    }
}

ClassSectionModel.aggregate([
    match, lookupTeacher, 
    {$unwind:"$idStudents"}, lookupStudent
// {$group:{"_id":"$location","count":{$sum:1}}},
// {$group:{"_id":null,"location_details":{$push:{"location":"$_id",
//                                                "count":"$count"}}}},
]).exec((err, result)=>{
	result.forEach(element=>{
		console.log(element)
	})
})

// {$unwind:"$location"},
// {$group:{"_id":"$location","count":{$sum:1}}},
// {$group:{"_id":null,"location_details":{$push:{"location":"$_id",
//                                                "count":"$count"}}}},

// let data = {
//     isActive: false,
//     createdAt: "1",
//     modifiedAt: "2",
//     idClassSection: "12",
//     semester: "12",
//     data: [{
//         section: "1",
//         dataSection: [{
//             question: "a?",
//             answer: "b"
//         }]
//     }]
// }

// SurveyFormModel.create(data, function (err, rs) {
//     if (err) console.log(err);
//     console.log(rs)
//     // saved!
//   });