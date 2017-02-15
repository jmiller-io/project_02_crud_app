var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var multer = require('multer');
var AWS = require('aws-sdk');

const s3 = new AWS.S3();
AWS.config.update(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
);


const upload = multer({
  storage: multer.memoryStorage(),
});





// DB url
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';

// generates random file name and adds an extension
var generateRandomFileName = function(f) {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  var randName = '';

  var extensionArray = f.mimetype.split('/');
  var extension = extensionArray[extensionArray.length - 1];

  while (randName.length < 32) {
    randName += letters[Math.floor(Math.random() * letters.length)]
  };
  return randName + '.' + extension;
};


// storage and file specifications for multer
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/img_uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, generateRandomFileName(file) )
//   }
// });
// var upload = multer({storage: storage});





// Router for adding a new spot
router.get('/addSpot', function(request, response, next) {
  // render the addSpot.hbs template and replace {{title}} with 'Add a New Spot'
  response.render('addSpot', {title: 'Add a New Spot'});
});


// handle post request on addSpot
router.post('/addSpot', upload.any(), function(request, response, next) {
  var file = generateRandomFileName(request.files[0]);
  s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: file,
      Body: request.files[0].buffer,
      ACL: 'public-read'
    }, function(err) {
      if(err) return response.status(400).send(err);
        var entry = {
          imgURL: 'https://archplotterdata.s3.amazonaws.com/' + file,
          description: request.body.description,
          category: request.body.category,
          coordinates: {lat: parseFloat(request.body.lat), lng: parseFloat(request.body.lng)}
        };
        mongo.connect(url, function(err, db) {
          db.collection('buildings').insertOne(entry, function(err, result) {
            console.log('Entry inserted');
            db.close();
            response.redirect('/');
          });
        });
  });
});


// handle updateSpot get request
router.get('/updateSpot', function(request, response, next) {
  //console.log(request.query.id);
  mongo.connect(url, function(err, db) {
    db.collection('buildings').find({}).toArray(function(err, results) {
      db.close();
      response.render('updateSpot', {title: 'Update Info for Places',
                                 items: results
      });
    });
  });
});


// Handle UpdateSpot POST Request
router.post('/updateSpot', upload.any(), function(request, response, next) {
  var id = request.body._id;
  var entry = {
    $set: {}
  };

  if (request.files[0]) {
    var file = generateRandomFileName(request.files[0]);
    s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: file,
      Body: request.files[0].buffer,
      ACL: 'public-read'
    }, function(err) {
        if(err) {
          return response.status(400).send(err)
        } else {
            entry.$set['imgURL'] = 'https://archplotterdata.s3.amazonaws.com/' + file
            console.log(entry)
        }
    })

    // delete old image on S3
    // s3.deleteObject({
    //   Bucket: process.env.S3_BUCKET,
    //   Key: 'OldImgURL'
    // }, function(err) {
    //   if(err) {
    //     console.log(err)
    //   } else {
    //     console.log('deleted img on Amazon')
    //   }
    // })


  }



  var coordinates = {};

  for (var key in request.body) {
    if (request.body[key] !== "" && key !== '_id') {
      if(key === 'lat' || key === 'lng') {
        coordinates[key] = parseFloat(request.body[key])
      } else {
        entry.$set[key] = request.body[key]
      }
    }
    if (Object.keys(coordinates).length > 0) {
      entry.$set.coordinates = coordinates
    }
  }
  console.log(entry)
  mongo.connect(url, function(err, db) {
    db.collection('buildings').update( {"_id": objectId(id)}, entry )
    db.close();
    response.redirect('/updateSpot')
  });


});


// Handle Delete Request
router.get('/deleteSpot?:id', function(request, response, next) {
  mongo.connect(url, function(err, db) {
    db.collection('buildings').deleteOne({"_id": objectId(request.query.id)}, function(err, result) {
      db.close();
      response.redirect('/updateSpot')
    });
  });
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
