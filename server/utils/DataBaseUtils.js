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
    Stock.findOne({ name: res.name }, function(err, doc) {
        if (err) throw err;
        if (doc) {
            doc.value = res.value;
            doc.save(function(err) {
                if(err) throw err;
                callback(false);
            });
        } else {
            var newStock = new Stock();
            newStock.name = res.name;
            newStock.value = res.value;
            newStock.save(function(err) {
                if(err) throw err;
                callback(true);
            });
        }
    });
};