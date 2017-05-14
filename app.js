var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');

global.dbHelper = require('./dao/dbHelper');
global.db = mongoose.connect(config.db);

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) {
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    } else {
    }
    next();
});

require('./routes')(app);
app.get('/', function (req, res) {
    res.render('login');
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8090, function () {
    console.log('The server is starting on port 8090.')
});
