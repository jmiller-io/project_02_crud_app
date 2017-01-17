var express = require('express');
var path = require('path');
var router = express.Router();
var mongo = require('mongodb').MongoClient;

// DB url
var url = 'mongodb://localhost:27017/structures';


// Router for adding a new spot
router.get('/addNewSpot', function(req, res) {
  res.send('add new spot here')
})


// route presenting json data
router.get('/data.json', function (req, res) {
  mongo.connect(url, function(err, db) {
    db.collection('buildings').find({}).toArray(function(err, results) {
      db.close();
      res.json(results);
    });
  });
})

module.exports = router;
