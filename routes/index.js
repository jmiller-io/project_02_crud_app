const express = require('express');
const router = express.Router();
const handlebars = require('handlebars');
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const multer = require('multer');
const AWS = require('aws-sdk');
const User = require('../models/user.js');
const Structure = require('../models/structure.js');

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


// Router for home page
router.get('/', (request, response, next) => {
  Structure.Model.find({}, (err, results) => {
    response.render('index', {title: 'Architectural.ly', spots: results.reverse().slice(0,4)})
  })
})

// Router for explore page
router.get('/explore', (request, response, next) => {
  response.render('explore', {title: 'Explore - Architectural.ly'})
})

// Router for adding a new spot
router.get('/addSpot', function(request, response, next) {
  // if user is not logged in redirect to home
  if (!request.session.user) return response.redirect('/');

  // render the addSpot.hbs template and replace {{title}} with 'Add a New Spot'
  response.render('addSpot', {title: 'Add Spot - Architectural.ly', user: request.session.user});
});


// handle post request on addSpot
router.post('/addSpot', upload.any(), function(request, response, next) {
  console.log(request.body)
  var file = generateRandomFileName(request.files[0]);
  s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: file,
      Body: request.files[0].buffer,
      ACL: 'public-read'
    }, function(err) {
      if (err) return response.status(400).send(err);
        // var entry = {
        //   imgURL: 'https://archplotterdata.s3.amazonaws.com/' + file,
        //   description: request.body.description,
        //   category: request.body.category,
        //   coordinates: {lat: parseFloat(request.body.lat), lng: parseFloat(request.body.lng)}
        // };
        let s = new Structure.Model({
          "imgURL": 'https://archplotterdata.s3.amazonaws.com/' + file,
          "description": request.body.description,
          "architect": request.body.architect,
          "built": request.body.built,
          "category": request.body.category,
          "coordinates": {
            "lat": parseFloat(request.body.lat),
            "lng": parseFloat(request.body.lng)
          }
        })
        s.save();
        // Add building to User
        User.findOneAndUpdate({
          _id: request.body.user_id
        }, {$push: {locations: s}}, (err, results) => {
          if (err) response.send(err)
            console.log(results)
          console.log('entry added')
          response.redirect('/profile')
        })

        // mongo.connect(url, function(err, db) {
        //   db.collection('buildings').insertOne(entry, function(err, result) {
        //     console.log('Entry inserted');
        //     db.close();
        //     response.redirect('/');
        //   });
        // });
  });
});


// handle updateSpot get request
router.get('/updateSpot', function(request, response, next) {
  Structure.Model.find({}, (err, results) => {
    response.render('updateSpot', {title: 'Edit Spot - Architectural.ly', items: results.reverse()});
  })
});


// Update Spot
router.post('/spots/:id', upload.any(), function(req, res, next) {
    var entry = {};
    for (var key in req.body) {
        if (req.body[key] !== "") {
            entry[key] = req.body[key];
        }
    }

    if (req.files[0]) {
        var file = generateRandomFileName(req.files[0]);
        entry['imgURL'] = 'https://archplotterdata.s3.amazonaws.com/' + file;
        s3.putObject({
            Bucket: process.env.S3_BUCKET,
            Key: file,
            Body: req.files[0].buffer,
            ACL: 'public-read'
        }, function(err) {
            if (err) {
                return res.status(400).send(err);
            }
        });
    }

    // Updates Spot document
    Structure.Model.update({
        _id: req.params.id
    }, entry, function(err, results) {
        if (!err) {res.redirect('/profile')}
    });
});



// Handle UpdateSpot POST Request
router.post('/updateSpot', upload.any(), function(request, response, next) {
  var id = request.body._id;
  var entry = {
    $set: {}
  };

  if (request.files[0]) {
    var oldImg_fname = request.body._img.split('/').pop();
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
          mongo.connect(url, function(err, db) {
            db.collection('buildings').update( {"_id": objectId(id)}, entry )
            db.close();
            response.redirect('/updateSpot')
          });
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


  } else {
    for (var key in request.body) {
      if(request.body[key] !== "" && key !== '_id') {
        entry.$set[key] = request.body[key]
      }
    }
    console.log(entry)
    mongo.connect(url, function(err, db) {
      db.collection('buildings').update( {"_id": objectId(id)}, entry )
      db.close();
      response.redirect('/updateSpot')
    });
  }

  // for (var key in request.body) {
  //   if (request.body[key] !== "" && key !== '_id') {
  //     entry.$set[key] = request.body[key]
  //   }
  //   if (Object.keys(coordinates).length > 0) {
  //     entry.$set.coordinates = coordinates
  //   }
  // }
  // console.log(entry)
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
  Structure.Model.find({}, (err, results) => {
    response.send(results)
  })
});

module.exports = router;
