var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
const config = require('./config.json');

var app = express();

/*
    Import Route route
*/
var login = require('./routes/login.route');
// var anwserSurvey = require('./routes/anwser-survey.route');
var manageAccountStudent = require('./routes/manage-account-student.route');
var manageAccountTeacher = require('./routes/manage-account-teacher.route');
var manageSurveyClass = require('./routes/manage-survey-class.route');
// var manageSurvey = require('./routes/manage-survey.route');
// var viewResult = require('./routes/view-result.route');
//  End import

/*
    Import middleware
*/
var authenticate = require('./middlewares/authentication.middleware');
//  End import middleware

/*
    Start connect Db
*/
mongoose.connect(config.db, { useNewUrlParser: true }).then(
    () => { console.log('connected ' + config.db) },
    err => { console.log(err) }
);
/*
    Set up
*/
//create application/x-www-form-urlencoded parser // default true
app.use(bodyParser.urlencoded({ extended: false })); // => value only string or array
app.use(bodyParser.json()); // => cho truy cap req.body
/**allow other ip access */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', "*");
  next();
});
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));



/*
    Route route which should handle request
*/
app.use('/api/login', login);
// app.use('/api/anwserSurvey', anwserSurvey);
app.use('/api/manageAccountStudent', authenticate, manageAccountStudent);
app.use('/api/manageAccountTeacher', authenticate, manageAccountTeacher);
app.use('/api/manageSurveyClass', authenticate, manageSurveyClass);
// app.use('/api/manageSurvey', manageSurvey);
// app.use('/api/viewResult', viewResult);
//  End route

/*
    Error handler
*/
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

/*
    close connection
*/
// mongoose.connection.close().then(
//     () => { console.log('disconnected') },
//     err => { console.log('error') }
// );

module.exports = app;

// // use JWT auth to secure the api, the token can be passed in the authorization header or querystring
// app.use(expressJwt({
//     secret: config.secret,
//     getToken: function (req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     }
// }).unless({ path: ['/users/authenticate', '/users/register'] }));

// // routes
// app.use('/users', require('./routes/users.route'));

// // error handler
// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send('Invalid Token');
//     } else {
//         throw err;
//     }
// });