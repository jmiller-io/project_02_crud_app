require('./config');
// Require models
const User = require('../models/user.js');
const Structure = require('../models/structure.js');

// var u = new User({
//   name: 'HillSighed',
//   avatar: 'my_avatar'
// });

// u.save();

// var s = new Structure.Model({
//   "imgURL": "https://archplotterdata.s3.amazonaws.com/utrxijbxnanerbfzczwlfovciamdaxea.jpeg",
//   "description": "The Gamble House",
//   "category": "Craftsman",
//   "coordinates": {
//     "lat": 34.0480205,
//     "lng": -118.23996980000001
//   }
// })

// s.save();

// var u2 = new User({
//   name: 'MtnSighed',
//   avatar: 'my_avatar'
// });

// u2.save();

// var t = new Structure.Model({
//   "imgURL": "https://archplotterdata.s3.amazonaws.com/utrxijbxnanerbfzczwlfovciamdaxea.jpeg",
//   "description": "The Mountain House",
//   "category": "Craftsman",
//   "coordinates": {
//     "lat": 34.048021,
//     "lng": -118.23996980000001
//   }
// })

// t.save();
// u2.locations.push(t)


// function seed() {


// // Create user
//   var user = new User({
//     _id: 111074352570139300000,
//     name: 'Jake',
//     avatar: "https://lh5.googleusercontent.com/-3jpfhZvZnSA/AAAAAAAAAAI/AAAAAAAAPBc/pSI1lvFg2PU/photo.jpg?sz=50",
//     locations: []
//   })

//   user.save()
// }
seed()
importSpots()
// var a = new Structure.Model({
//   "imgURL": "https://archplotterdata.s3.amazonaws.com/frcnxiqyjtjrovojfkcdpecnoyshyccg.jpeg",
//   "description":"The Gamble House","category":"Craftsman",
//   "coordinates":{
//     "lat":34.0480166,
//     "lng":-118.24003250000001}
// })

// a.save()


function importSpots() {
  var allSpots = [
    {"_id":{"$oid":"58a8c9dcba95c100110491a1"},"imgURL":"https://archplotterdata.s3.amazonaws.com/brkngtsbyhmhbtpvdvokalbxmjmlihwc.jpeg","description":"Nice Craftsman's Bungalow","category":"Craftsman","coordinates":{"lat":34.1563986,"lng":-118.1160626},"_img":"https://archplotterdata.s3.amazonaws.com/brkngtsbyhmhbtpvdvokalbxmjmlihwc.jpeg"},
    {"_id":{"$oid":"58a8cb5bba95c100110491a2"},"imgURL":"https://archplotterdata.s3.amazonaws.com/vokwffejcytsijlffpfftcmhsvehxghr.jpeg","description":"","category":"Spanish","coordinates":{"lat":34.1589941,"lng":-118.1162454}},
    {"_id":{"$oid":"58a8ccc7ba95c100110491a3"},"imgURL":"https://archplotterdata.s3.amazonaws.com/rslpqeldyvjfevvzkicxnjvcelceuxjc.jpeg","description":"","category":"Spanish","coordinates":{"lat":34.1604501,"lng":-118.1177397}},
    {"_id":{"$oid":"58a8cdb9ba95c100110491a4"},"imgURL":"https://archplotterdata.s3.amazonaws.com/jkxiqyppsitfrmihfsucipktqdhmhgdh.jpeg","description":"","category":"Craftsman","coordinates":{"lat":34.1601178,"lng":-118.1195818},"_img":"https://archplotterdata.s3.amazonaws.com/jkxiqyppsitfrmihfsucipktqdhmhgdh.jpeg"},
    {"_id":{"$oid":"58a9f45c37f19600117dbccb"},"imgURL":"https://archplotterdata.s3.amazonaws.com/pgyttjdoodrdiedbqsaapwzamlpaxdye.jpeg","description":"","category":"Spanish","coordinates":{"lat":33.835633,"lng":-116.5526691}},
    {"_id":{"$oid":"58a9f61e37f19600117dbcce"},"imgURL":"https://archplotterdata.s3.amazonaws.com/lcfcsqfhtxnltyhayvdqbzbxkpnplcai.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8372168,"lng":-116.5525174}},
    {"_id":{"$oid":"58a9f84037f19600117dbccf"},"imgURL":"https://archplotterdata.s3.amazonaws.com/rqjlehamavhxjqkgbhkqnfwrisnrxgxj.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8389421,"lng":-116.5545843}},
    {"_id":{"$oid":"58a9f8d937f19600117dbcd0"},"imgURL":"https://archplotterdata.s3.amazonaws.com/qlmfnbthtvxkqzajmjphpeorzdzecqfg.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8391206,"lng":-116.5544885}},
    {"_id":{"$oid":"58a9fa4237f19600117dbcd1"},"imgURL":"https://archplotterdata.s3.amazonaws.com/grevwnzebakhguvpodrwqpvpmpjvilrg.jpeg","description":"The Rat Pack House","category":"Mid-Century Modern","coordinates":{"lat":33.8401467,"lng":-116.5544699},"_img":"https://archplotterdata.s3.amazonaws.com/grevwnzebakhguvpodrwqpvpmpjvilrg.jpeg"},
    {"_id":{"$oid":"58a9fab137f19600117dbcd2"},"imgURL":"https://archplotterdata.s3.amazonaws.com/aeoudytiszsjhxudjivgdxeyxybaycwg.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8400847,"lng":-116.5552258}},
    {"_id":{"$oid":"58a9fce537f19600117dbcd3"},"imgURL":"https://archplotterdata.s3.amazonaws.com/dbrjnyqtihzvlormqiuxcecxcbvuglps.jpeg","description":"Elvis Honeymoon Hideaway","category":"Mid-Century Modern","coordinates":{"lat":33.8409187,"lng":-116.5572228},"_img":"https://archplotterdata.s3.amazonaws.com/dbrjnyqtihzvlormqiuxcecxcbvuglps.jpeg"},
    {"_id":{"$oid":"58a9ff6637f19600117dbcd4"},"imgURL":"https://archplotterdata.s3.amazonaws.com/kexrtquiuaiuegonwrdujpjuwnlqxefy.jpeg","description":"","category":"Craftsman","coordinates":{"lat":33.832364,"lng":-116.5235668},"lat":"33.8398991","lng":"-116.5572146","_img":"https://archplotterdata.s3.amazonaws.com/kexrtquiuaiuegonwrdujpjuwnlqxefy.jpeg"},
    {"_id":{"$oid":"58aa013c37f19600117dbcd5"},"imgURL":"https://archplotterdata.s3.amazonaws.com/ckenybzfszauxpdybeaftdkapkbbvcis.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8437957,"lng":-116.5584514}},
    {"_id":{"$oid":"58aa03d937f19600117dbcd6"},"imgURL":"https://archplotterdata.s3.amazonaws.com/faumwwekdtkbqrymmewrsavxqfxqrpqi.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8447083,"lng":-116.5583592}},
    {"_id":{"$oid":"58aa066437f19600117dbcd7"},"imgURL":"https://archplotterdata.s3.amazonaws.com/cmzdbfgxpqeeapyttfwciwnrizpjface.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8424221,"lng":-116.5563317}},
    {"_id":{"$oid":"58aa089337f19600117dbcd8"},"imgURL":"https://archplotterdata.s3.amazonaws.com/eaazuyllgphkkyaaguavqwrbfgwmnbjg.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8448673,"lng":-116.5532494}},
    {"_id":{"$oid":"58aa2253fc10450011e939e0"},"imgURL":"https://archplotterdata.s3.amazonaws.com/ystkmrmjymanfgviujmqwgsfsjgzjkhc.jpeg","description":"","category":"Mid-Century Modern","coordinates":{"lat":33.8150769,"lng":-116.5454437}},
    {"_id":{"$oid":"58aa2862fc10450011e939e1"},"imgURL":"https://archplotterdata.s3.amazonaws.com/pbfqdkvbwjpeszgchadncyukncpyquyj.jpeg","description":"","category":"Spanish","coordinates":{"lat":33.8223713,"lng":-116.551412}},
    {"_id":{"$oid":"58bf4a5a5af47e0011902d48"},"imgURL":"https://archplotterdata.s3.amazonaws.com/corspwdtcbmrfxkvyfwddzamnkxgvcfe.jpeg","description":"Amazing Bungalow with a Golden Arrow lawn award.","category":"Craftsman","coordinates":{"lat":34.1604806,"lng":-118.1165486},"_img":"https://archplotterdata.s3.amazonaws.com/corspwdtcbmrfxkvyfwddzamnkxgvcfe.jpeg"},
    {"_id":{"$oid":"58e02391de6e930011d55ec4"},"imgURL":"https://archplotterdata.s3.amazonaws.com/owbtfikxudqmirtwjkkiyzhefywaqfyx.jpeg","description":"","category":"Mediterranean","coordinates":{"lat":34.1799347,"lng":-118.1156968}}
  ]

  allSpots.forEach((spot) => {

    var a = new Structure.Model({
      imgURL: spot.imgURL,
      description: spot.description,
      category: spot.category,
      coordinates: {
        lat: spot.coordinates.lat,
        lng: spot.coordinates.lng
      }
    })

    a.save()
    addToUser(a)
  })
}

function addToUser(s) {
   User.findOneAndUpdate({
      _id: 111074352570139300000
      }, {$push: {locations: s}}, (err, results) => {
        if (err) response.send(err)
          console.log('entry added')
        })
}

// Structure.Model.find({}, (err, results) => {
//   results.forEach((spot) => {
//         User.findOneAndUpdate({
//           _id: 111074352570139300000
//         }, {$push: {locations: spot}}, (err, results) => {
//           if (err) response.send(err)
//             console.log(results)
//           console.log('entry added')
//         })
//   })
// })
