var express = require('express');
var router = express.Router();
var path = require('path');
var gamer_controller = require('../controllers/estudianteController');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname, '../public/html/reg.html'));
    res.render('reg', { title: 'My PEEEEERRO Page' });
});

router.post('/', gamer_controller.estudiante_create_post);


module.exports = router;
