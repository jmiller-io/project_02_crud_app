var mongoose = require('mongoose');

var StructureSchema = new mongoose.Schema({
  architect: String,
  built: Date,
  description: String,
  category: String,
  imgURL: String,
  postedBy: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
})

var Structure = mongoose.model('Structure', StructureSchema);

module.exports = {
  Schema: StructureSchema,
  Model: Structure
}
