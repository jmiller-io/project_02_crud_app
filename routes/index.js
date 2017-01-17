var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var multer = require('multer');
var upload = multer({dest: 'public/img_uploads/'});

// DB url
var url = 'mongodb://localhost:27017/structures';


// Router for adding a new spot
router.get('/addNewSpot', function(request, response, next) {
  // render the addNewSpot.hbs template and replace {{title}} with 'Add a New Spot'
  response.render('addNewSpot', {title: 'Add a New Spot'});
});


// handle post request on addNewSpot
router.post('/addNewSpot', upload.any(), function(request, response, next) {
  var entry = {
    img: request.files,
    description: request.body.description,
    category: request.body.category,
    coordinates: {lat: parseFloat(request.body.lat), lng: parseFloat(request.body.lng)}

  };

  response.send(entry.img)

  // mongo.connect(url, function(err, db) {
  //   db.collection('buildings').insertOne(entry, function(err, result) {
  //     console.log('Entry inserted');
  //     db.close();
  //   });
  // });
  // response.redirect('/');
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
