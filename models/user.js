var mongoose = require('mongoose');
var StructureSchema = require('./structure.js');

var UserSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  locations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Structure'}]
})

var User = mongoose.model('User', UserSchema);
module.exports = User;
