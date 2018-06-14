var express = require('express');
var router = express.Router();
var path = require('path');
var admin_controller = require('../controllers/adminController');
var estud_controller = require('../controllers/estudianteController');
var Admin = require('../models/admin');


/* GET admin page. */
router.get('/', function(req, res, next) {
    /*Admin.create({
        "nombre": "Andresrodart",
        "password": "ready"
    }, function (err, user) {
    if (err) {
      //return next(err);
      console.log(err);
    } else {
      //return res.redirect('/');
      console.log(user);
    }
  });*/
  res.render('admin', { title: 'admin' });
});

router.post('/', admin_controller.admin_create_get);

router.get('/CRUD', function(req, res, next){
    //if(req.session.userId)
        res.render('crud', { title: 'crud' });
    //else
      //  res.redirect('/');
});

router.post('/CRUD', estud_controller.estudiante_make_post);

router.get('/report', function(req, res, next){
    //if(req.session.userId)
        res.render('report', { title: 'report' });
    //else
      //  res.redirect('/');
});

router.post('/report', estud_controller.estudiante_make_post_report);

module.exports = router;

