var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var multer = require('multer');






var randomFileName = function() {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  var randName = '';
  while (randName.length < 16) {
    randName += letters[Math.floor(Math.random() * letters.length)]
  };
  return randName;
};





// storage and file specifications for multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img_uploads')
  },
  filename: function (req, file, cb) {
    var extensionArray = file.mimetype.split('/');
    var extension = extensionArray[extensionArray.length - 1];
    cb(null, randomFileName() + '.' + extension)
    console.log(file)
  }
})

var upload = multer({storage: storage});

// DB url
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/structures';


// Router for adding a new spot
router.get('/addNewSpot', function(request, response, next) {
  // render the addNewSpot.hbs template and replace {{title}} with 'Add a New Spot'
  response.render('addNewSpot', {title: 'Add a New Spot'});
});


// handle post request on addNewSpot
router.post('/addNewSpot', upload.any(), function(request, response, next) {
  // var imgpath = request.files[0].path;
  // imgpath = imgpath.substring(7,imgpath.length);
  var entry = {
    // WORKS imgLocation: request.files[0].path,
    imgLocation: request.files[0].path.substring(7, this.length),
    description: request.body.description,
    category: request.body.category,
    coordinates: {lat: parseFloat(request.body.lat), lng: parseFloat(request.body.lng)}

  };

  response.send(entry.imgLocation);

  mongo.connect(url, function(err, db) {
    db.collection('buildings').insertOne(entry, function(err, result) {
      console.log('Entry inserted');
      db.close();
    });
  });
  response.redirect('/');
});

// route presenting json data
router.get('/data.json', function (request, response) {
  mongo.connect(url, function(err, db) {
    db.collection('buildings').find({}).toArray(function(err, results) {
      db.close();
      response.json(results);
    });
  });
});

module.exports = router;
