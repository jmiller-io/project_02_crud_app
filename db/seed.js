require('./config');
// Require models
const User = require('../models/user.js');
const Structure = require('../models/structure.js');

// var u = new User({
//   name: 'HillSighed',
//   avatar: 'my_avatar'
// });

// u.save();

var s = new Structure.Model({
  "imgURL": "https://archplotterdata.s3.amazonaws.com/utrxijbxnanerbfzczwlfovciamdaxea.jpeg",
  "description": "The Gamble House",
  "category": "Craftsman",
  "coordinates": {
    "lat": 34.0480205,
    "lng": -118.23996980000001
  }
})

s.save();

var u2 = new User({
  name: 'MtnSighed',
  avatar: 'my_avatar'
});

u2.save();

var t = new Structure.Model({
  "imgURL": "https://archplotterdata.s3.amazonaws.com/utrxijbxnanerbfzczwlfovciamdaxea.jpeg",
  "description": "The Mountain House",
  "category": "Craftsman",
  "coordinates": {
    "lat": 34.048021,
    "lng": -118.23996980000001
  }
})

t.save();
// u2.locations.push(t)
