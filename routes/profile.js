const express = require('express');
const request = require('request');
const router = express.Router();
const user = require('../models/user.js');

router.get('/', (req, res, next) => {
    const user = req.session.user;
    console.log(user)
    if (!user) return res.redirect('/');

    res.render('profilePage', {title: 'Profile - Architecturally', user: user})

});

router.get('/me', (req, res, next) => {
    const url = 'https://people.googleapis.com/v1/people/me';
    const access_token = req.session.access_token;
    if (!access_token) return res.redirect('/');
    const options = {
        method: 'GET',
        url,
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    };
  request(options, (err, response, body) => {
    const userData = JSON.parse(body);
    req.session.user = userData;
    console.log(userData.displayName)
    // Database work
    user.findById({
        _id: req.session.user.id
    }, function(err, results) {
        if (err) console.log(err)
        if (!results) {
          console.log('no existing user in db');
            // var u = new user({
            //   name: req.session.user.name.givenName,
            //   avatar: req.session.user.image.url
            // });
            // u.save();
            } else if (results) {
              console.log('user exists in db');
              // req.session.user.locations = results.locations;
            }
            return res.redirect('/profile');
        });
    });
});

module.exports = router;
