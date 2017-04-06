const express = require('express');
const request = require('request');
const router = express.Router();
const user = require('../models/user.js');

router.get('/', (req, res, next) => {
    if (!req.session.user) return res.redirect('/');
    user.findOne({
                _id: req.session.user.id
            })
            .populate('locations')
            .exec(function(err, results) {
                if (err) console.log(err);
                    res.render('profilePage', {
                        title: 'Profile - Architecturally',
                        avatar: req.session.user.image.url,
                        name: req.session.user.name.givenName,
                        locations: results.locations.reverse()
                    });

            });

});

router.get('/me', (req, res, next) => {
    const url = 'https://www.googleapis.com/plus/v1/people/me';
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
        console.log(userData)
        // Database work
        user.findById({
            _id: req.session.user.id
        }, function(err, results) {
            if (err) {
                console.log(err);
            }

            if (!results) {
                console.log('no existing user in db');
                var u = new user({
                    _id: req.session.user.id,
                    name: req.session.user.name.givenName,
                    avatar: req.session.user.image.url
                });
                u.save();
            } else if (results) {
                console.log('user exists in db');
                req.session.user.locations = results.locations;
            }
            return res.redirect('/profile');
        });
    });
});

module.exports = router;
