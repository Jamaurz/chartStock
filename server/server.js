var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

require('dotenv').load();

var indexRoutes = require('./routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(process.env.MONGO_URL);
mongoose.Promise = global.Promise;

app.use(cors({ origin: '*' }));
app.use('/', indexRoutes);

var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    console.log('running at localhost:' + port);
});

var io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('init', function() {
        console.log('soket init')
        socket.emit('start');
    });

    socket.on('refresh', function() {
        socket.broadcast.emit('start');
    });

    socket.on('refreshThis', function() {
        socket.emit('start');
    });

    socket.emit('start');
})

// ERROR HANDLER
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;