var path = require('path');
var app = require('express').Router();
var request = require('request');
var db = require('../utils/DataBaseUtils');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/refreshStock', function(req, res) {
   db.refreshStock(function(data) {
       res.send(data);
   });
});

app.post('/check', function (req, res) {
    var reqVal = 'https://www.quandl.com/api/v3/datasets/WIKI/' + req.body.chartName
    reqVal += '.json?collapse=' + req.body.frequency + '&start_date=';
    reqVal += req.body.dS + '&end_date=' + req.body.dE;
    reqVal += '&api_key=kzsJRqnM_mbJPuk6Spzo';

    request(reqVal, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(false)
        }
    })
});

app.post('/addDbStock', function(req, res) {
    db.addDbStock(req.body.res, function(data) {
        res.send(data);
    });
});

app.post('/removeDbStock', function(req, res) {
    db.removeDbStock(req.body.label, function(data) {
        res.send(data);
    });
});

module.exports = app;