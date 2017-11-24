var express = require('express');
var router = express.Router();
var User = require('../models/user');


// Register
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register an account with HappyHelper' });
});

// Register
router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.password2;

    // Validation of matching passwords
    req.checkBody('password2', 'Passwords must match!').equals(req.body.password);

    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        var newUser = new User({
            username: username,
            password: password,
            helper_flag: 0
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'Account registered! Please log in');

        res.redirect('/');
    }
});

module.exports = router;
