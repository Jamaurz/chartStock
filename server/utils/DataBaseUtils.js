var mongoose = require('mongoose');
var Stock = require('../models/stock.js');

exports.refreshStock = function(callback) {
  Stock.find(function(err, doc) {
      if(err) throw err
      if(doc) {
          callback(doc);
      }
  })
};

exports.addDbStock = function(res, callback) {
    var color = '#'+Math.random().toString(16).slice(-6);
    Stock.findOne({ name: res }, function(err, doc) {
        if (err) throw err;
        if (doc) {
            callback(false);
        } else {
            var newStock = new Stock();
            newStock.name = res;
            newStock.color = color;
            newStock.save(function(err) {
                if(err) throw err;
                callback(true);
            });
        }
    });
};

exports.removeDbStock = function(label, callback) {
    Stock.findOne({ name: label }, function(err, doc) {
        if (err) throw err;
        if (doc) {
            doc.remove(function(err) {
                if (err) throw err
                callback(true);
            });
        } else {
            callback(false);
        }
    });
};