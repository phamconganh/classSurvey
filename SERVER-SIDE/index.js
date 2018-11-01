const express = require('express');
const bodyParser = require('body-parser');

// var config = require('./config.json');

const app = express();

//create application/x-www-form-urlencoded parser // default true
app.use(bodyParser.urlencoded({ extended: false })); // => value only string or array
app.use(bodyParser.json()); // => cho truy cap req.body
/**allow other ip access */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  next();
});
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

/*
    Import Route modules
*/
// var indexRouter = require('./routes/index');

/*
    Import middleware
*/
// var middlewareToken = require('./middlewares/token');

/*
    Connect Db
*/



/*
    Routes which should handle request
*/
// app.use('/', middlewareToken,indexRouter);

/*
    Middleware use
*/
// app.use(middlewareToken, function(req, res, next) {
//     // next(createError(404));
//     res.render('pages/error',
//         { objectType: req.objectType, message: 'Not found!', codeError: 404});
// });

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
// app.use('/users', require('./controllers/users.controller'));

// // error handler
// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send('Invalid Token');
//     } else {
//         throw err;
//     }
// });