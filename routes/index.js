var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Meetup = require('../models/meetup');



// User.findOne({_id:req.session.passport.user}).then(function(record){
//     record.habits.push("Smoking");
//     record.save();
// });

/* GET the login page. */
router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        res.render('dashboard', { title: 'HappyHelper - Dashboard' });
    } else {
        res.render('login', { title: 'Sign in to HappyHelper!' });
    }
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
    // var newMeetup= new Meetup({
    //     name: "Testing Meetups",
    //     date: "30/11/2017",
    //     time: "11:00am-17:00pm",
    //     location: "Eglinton Country Park",
    //     about: "Group hill walking trip starting from Eglinton Country Park. The trip should take roughly 6 hours, but may over/under run. Suitable for all age groups. Walking equiptment required."
    // });
    // newMeetup.attending.push("test");
    // newMeetup.save().then(function(record){
    //         result.meetups.push("Testing Meetups")
    //         result.save();
    //     });
    // });
    User.findOne({_id:req.session.passport.user}).then(function(result){
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        var date = day+"/"+month+"/"+year;
        if(result.helper_flag == 1){
            var assigned = result.assigned;
            res.render('helper/helper_dash', { title: 'HappyHelper - Dashboard', assigned:assigned});
        } else {
            var today = "";
            var diaryEntries = result.diaryEntries;
            for (var i=0; i<diaryEntries.length; i++){
                if(diaryEntries[i].date == date){
                    today = diaryEntries[i];
                }
            }
            res.render('dashboard', { title: 'HappyHelper - Dashboard', todaysDiary:today });
        }
    });
});

router.get('/meetupdetails', function(req, res, next) {
    res.render('meetup_details', { title: 'HappyHelper - Meetup' });
});

router.post('/save-diary', function(req,res,next){
    var rating = req.body.happyRating;
    var text = req.body.happyComments;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var date = day+"/"+month+"/"+year;
    User.findOne({_id:req.session.passport.user}).then(function(result){
        var diaryEntries = result.diaryEntries;
        var sameDate = [];
        var update = 0;
        for (var i=0;i<diaryEntries.length;i++){
            if(diaryEntries[0].date == date){
                result.diaryEntries[i].rating = rating;
                result.diaryEntries[i].text = text;
                result.save();
                update = 1;
            }
        }
        if (update ==0){
            result.diaryEntries.push({date:date, rating:rating, text:text});
            result.save();
        }
        res.redirect('/dashboard');
    });
});

router.post('/attending/:name', function(req,res,next){
    var meetup_name = req.params.name;
    var attending = req.body.attending;
    if(attending == "on"){
        User.findOne({_id:req.session.passport.user}).then(function(result){
            var user = result.username;
            result.meetups.push(meetup_name);
            result.save().then(function(please){
                Meetup.findOne({name:meetup_name}).then(function(record){
                    record.attending.push(user);
                    record.save().then(function(updatedRecord){
                        var attending = true;
                        res.render('meetup_details', {title:'HappyHelper', meetup:updatedRecord, user:user, attending:attending});
                    });
                });
            });

        });
    } else {
        User.findOne({_id:req.session.passport.user}).then(function(result){
            var user = result.username;
            result.meetups.pull(meetup_name);
            result.save().then(function(please){
                Meetup.findOne({name:meetup_name}).then(function(record){
                    record.attending.pull(user);
                    record.save().then(function(updatedRecord){
                        var attending = false;
                        res.render('meetup_details', {title:'HappyHelper', meetup:updatedRecord, attending:attending});
                    });
                });
            });
        });
    }
})


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

        var update = -1;
        for (var i=0;i<sameDate.length;i++){
            if(sameDate[0].name == name){
                update = i;
            }
        }
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
    User.findOne({_id:req.session.passport.user}).then(function(record){
        if(record.helper_flag == 1){
            Meetup.find().then(function(result){
                var meetupArray = [];
                for (var i=0; i<result.length;i++){
                    jsonObject = {};
                    jsonObject["name"] = result[i].name;
                    jsonObject["date"] = result[i].date;
                    jsonObject["time"] = result[i].time;
                    jsonObject["attending"] = result[i].attending.length;
                    jsonObject["location"] = result[i].location;
                    meetupArray.push(jsonObject);
                }
                res.render('helper/helper_meetups', { title: 'HappyHelper - Meetups', meetups:meetupArray});
            });
        } else {
            var meetups = record.meetups;
            Meetup.find({'name': { $in: meetups }}).then(function(result){
                var meetupArray = [];
                for (var i=0; i<result.length;i++){
                    jsonObject = {};
                    jsonObject["name"] = result[i].name;
                    jsonObject["date"] = result[i].date;
                    jsonObject["time"] = result[i].time;
                    jsonObject["attending"] = result[i].attending.length;
                    jsonObject["location"] = result[i].location;
                    meetupArray.push(jsonObject);
                }
                Meetup.find().then(function(docs){
                    var allArray = [];
                    for (var i=0; i<docs.length;i++){
                        jsonObject = {};
                        jsonObject["name"] = docs[i].name;
                        jsonObject["date"] = docs[i].date;
                        jsonObject["time"] = docs[i].time;
                        jsonObject["attending"] = docs[i].attending.length;
                        jsonObject["location"] = docs[i].location;
                        allArray.push(jsonObject);
                    }
                    if (allArray < 3){
                        var popularArray = allArray;
                    } else {
                        var popularArray = allArray.slice(0, 3);
                    }
                    res.render('meetups', { title: 'HappyHelper - Meetups', meetups:meetupArray, popular:popularArray});
                });
            });
        }
    });
});

router.post('/helper/create', function(req,res,next){
    var meetup_name = req.body.name;
    var meetup_date = req.body.date;
    var meetup_time = req.body.time;
    var meetup_location = req.body.location;
    var about_meetup = req.body.about;

    var newMeetup= new Meetup({
        name: meetup_name,
        date: meetup_date,
        time: meetup_time,
        location: meetup_location,
        about: about_meetup
    });

    newMeetup.save();
    res.redirect('/meetups')
});

router.post('/meetups-search', function(req,res,next){
    var query = req.body.search;
    Meetup.find({ "name": { "$regex": query, "$options": "i" } },function(err,docs) {
        res.render('search_results', {title:'HappyHelper - Search results', query:query, meetups:docs});
    });
});

router.get('/meetup/details/:name', function(req,res,next){
    var name = req.params.name;
    User.findOne({_id:req.session.passport.user}).then(function(result){
        var username = result.username;
        Meetup.findOne({name:name}).then(function(record){
            var attending = false;
            for (var i=0;i<record.attending.length;i++){
                if(username == record.attending[i]){
                    attending = true;
                }
            }
            if(result.helper_flag==1){
                res.render('helper/helper_meetup_details', {title:'HappyHelper', meetup:record, attending:attending});

            } else {
                res.render('meetup_details', {title:'HappyHelper', meetup:record, attending:attending});
            }
        });
    });
});

router.get('/meetups/delete/:name', function(req,res,next){
    var name = req.params.name;
    Meetup.remove({name:name}).then(function(result){
        res.redirect('/meetups')
    });
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
