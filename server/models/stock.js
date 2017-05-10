var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    name: String,
    color: String
});

module.exports = mongoose.model('Stock', Stock);