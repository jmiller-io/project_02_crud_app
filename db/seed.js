require('./config');
// Require models
const User = require('../models/user.js');
const Structure = require('../models/structure.js');

var u = new User({
  name: 'HillSighed',
  avatar: 'my_avatar'
});

u.save();

var s = new Structure.Model({
  "imgURL": "https://archplotterdata.s3.amazonaws.com/utrxijbxnanerbfzczwlfovciamdaxea.jpeg",
  "description": "The Gamble House",
  "category": "Craftsman",
  "coordinates": {
    "lat": 34.0480205,
    "lng": -118.23996980000001
  }
})

u.locations.push(s)
