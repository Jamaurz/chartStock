var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    name: String,
    value: []
});

module.exports = mongoose.model('Stock', Stock);