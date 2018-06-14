var Admin = require('../models/admin');
var mongoose = require('mongoose');
var path = require('path');


exports.admin_create_get = function(req, res, next) {
    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    Admin.authenticate(req.body.gamer, req.body.password, function (error, user) {
       if (error || !user) {
           req.flash('error', 'Password or Email wrong :C.');
           return res.redirect('back');
       } else {
           req.session.userId = user._id;
           req.session.user = user.gamerTag;
           req.session.mail = user.email;
           return res.redirect('admin/CRUD');
       }
     });
};