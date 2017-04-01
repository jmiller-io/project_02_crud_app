var mongoose = require('mongoose');

var StructureSchema = new mongoose.Schema({
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
