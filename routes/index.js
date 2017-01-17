var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;

// DB url
var url = 'mongodb://localhost:27017/structures';


// Router for adding a new spot
router.get('/addNewSpot', function(request, response, next) {
  // render the index.hbs template and replace {{title}} with 'MongoDB - Basics'
  response.render('addNewSpot', {title: 'Add a New Spot'});
});


// handle post request on addNewSpot
router.post('/addNewSpot', function(request, response, next) {
  var entry = {
    description: request.body.description,
    category: request.body.category,
  };
  console.log(request.body.description, request.body.category);
  // response.send('' + request.body.description + ' ' + request.body.category);

  mongo.connect(url, function(err, db) {
    db.collection('buildings').insertOne(entry, function(err, result) {
      console.log('Entry inserted');
      db.close();
    })
  })
  response.redirect('/')
})

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
