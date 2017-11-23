var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


// User.findOne({_id:req.session.passport.user}).then(function(record){
//     record.habits.push("Smoking");
//     record.save();
// });

/* GET the login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Sign in to HappyHelper!' });
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', { title: 'HappyHelper - Dashboard' });
});

/* GET habits page. */
router.get('/habits', function(req, res, next) {
    User.findOne({_id:req.session.passport.user}).then(function(record){
        var habitsNames = record.habits;
        res.render('habits', { title: 'HappyHelper - Habits', habits:habitsNames });
    });
});

router.post('/habits/create', function(req,res,next){
    req.checkBody('name', 'Habit name required').notEmpty();

    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //Run the validators
    var errors = req.validationErrors();

    var name = req.body.name

    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.push(name);
        record.save();
        res.redirect('/habits');
    });
});

router.get('/habits/create', function(req,res,next){
    res.render('habit_form', { title: 'HappyHelper - add custom habit' });
});

router.get('/habits/:this', function(req,res,next){
    var name = req.params.this;
    res.render('habit_detail', {habit: name});
});

router.get('/delete/:habit', function(req,res,next){
    var name = req.params.habit;
    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.pull(name);
        record.save();
        res.redirect('/habits');
    });
});

router.post('/update/:habit', function(req,res,next){
    var name = req.params.habit;
    var value = req.body.habitVal;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var date = day+"/"+month+"/"+year;
    User.findOne({_id:req.session.passport.user}).then(function(record){
        var tracked_stats = record.tracked_stats;
        var sameDate = [];
        for (var i=0;i<tracked_stats.length;i++){
            if(tracked_stats[0].date == date){
                sameDate.push(tracked_stats[i])
            }
        }
        console.log(sameDate);

        var update = -1;
        for (var i=0;i<sameDate.length;i++){
            if(sameDate[0].name == name){
                update = i;
            }
        }
        console.log("Need to update entry " + update)
        if (update>-1){
            record.tracked_stats[update].value = value;
            record.save();
        } else {
            record.tracked_stats.push({name:name, date:date, value:value});
            record.save();
        }
        res.redirect('/habits');
    });
});

/* GET meetups page. */
router.get('/meetups', function(req, res, next) {
    res.render('meetups', { title: 'HappyHelper - Meetups' });
});


passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'Unknown User'});
        }

        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid password'});
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/', passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/',failureFlash: true}),function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You have successfully logged out!');
    res.redirect('/');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You must be logged in to use app!');
		res.redirect('/');
	}
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
module.exports = router;
