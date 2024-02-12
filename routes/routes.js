var express = require('express');


var router = express.Router();

var { body, validationResult } = require('express-validator');


router.get('/', function (req, res) {
    const user = req.session.user;
    var locals = {
        title: 'main',
        description: 'Main page',
        header: 'Main page',
        body: 'yes',
        user : user
    };
    res.render('index', locals);
});


router.get('/books', function (req, res) {
    const user = req.session.user;
    
    if (!user) {
        return res.redirect('/login');
    }

    var locals = {
        title: 'main',
        description: 'Main page',
        header: 'Main page',
        body: 'yes',
        user : user
    };
    res.render('books', locals);
});

router.get('/movies', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    var locals = {
        title: 'main',
        description: 'Main page',
        header: 'Main page',
        body: 'yes',
        user : user
    };
    res.render('movies', locals);
});



router.get('/weather', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/login');
    }
    var locals = {
        title: 'main',
        description: 'Main page',
        header: 'Main page',
        body: 'yes',
        user : user
    };
    res.render('weather', locals);
});


router.get('/login', (req, res) => {
    const user = req.session.user;
    if (user) {
        return res.redirect('/');
    }
    var locals = {
        title: 'main',
        description: 'Main page',
        header: 'Main page',
        body: 'yes',
        user : user
    };
    res.render('login', locals);
});

router.get('/signup', (req, res) => {
    const user = req.session.user;
    if (user) {
        return res.redirect('/');
    }
    var locals = {
        title: 'main',
        description: 'Main page',
        header: 'Main page',
        body: 'yes',
        user : user
    };
    res.render('signup', locals);
});




// exports.configureRoutes = function (app) {
//     app.use('/', router);
// };

module.exports = router;