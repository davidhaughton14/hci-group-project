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
    User.findOne({_id:req.session.passport.user}).then(function(result){
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth()+1;
        var year = d.getFullYear();
        var date = year+"-"+month+"-"+day;
        if(result.helper_flag == 1){
            var assigned = result.assigned;
            res.redirect('/meetups')
        } else {
            var habits = result.habits;
            var tracked = result.tracked_stats;
            var today = "";
            var diaryEntries = result.diaryEntries;
            for (var i=0; i<diaryEntries.length; i++){
                if(diaryEntries[i].date == date){
                    today = diaryEntries[i];
                }
            }

            var todaysHabits = [];
            var todaysHabitsNames = [];
            for (var j=0;j<result.habits.length;j++){
                for (var i=0; i<tracked.length; i++){
                if(tracked[i].date == date){
                        if (result.habits[j].name == tracked[i].name){
                            jsonObject = {};
                            jsonObject["name"] = tracked[i].name;
                            todaysHabitsNames.push(tracked[i].name);
                            jsonObject["value"] = tracked[i].value;
                            jsonObject["unit"] = result.habits[j].unit;
                            jsonObject["limit"] = result.habits[j].limit;
                            todaysHabits.push(jsonObject);
                        }
                    }
                }
            }
            for (var x=0;x<result.habits.length;x++){
                if (todaysHabitsNames.indexOf(result.habits[x].name) == -1){
                    jsonObject = {};
                    jsonObject["name"] = result.habits[x].name;
                    jsonObject["value"] = 0;
                    jsonObject["unit"] = result.habits[x].unit;
                    jsonObject["limit"] = result.habits[x].limit;
                    todaysHabits.push(jsonObject);
                }
            }
            var todaysMeetup;
            Meetup.find({'name': { $in: result.meetups }}).then(function(record){
                for (var x=0; x<record.length; x++){
                    if(record[x].date == date){
                        todaysMeetup = record[x];
                    }
                }
                res.render('dashboard', { title: 'HappyHelper - Dashboard', todaysDiary:today, habits:habits, todaysHabits:todaysHabits, todaysMeetup:todaysMeetup });
            });
        }
    });
});

router.get('/meetupdetails', function(req, res, next) {
    res.render('meetup_details', { title: 'HappyHelper - Meetup' });
});

router.get('/recommendations', function(req,res,next){
    User.findOne({_id:req.session.passport.user}).then(function(record){
        if(record.helper_flag == 1){
            var users = record.assigned;
            User.find({'username': { $in: users }}).then(function(result){
                res.render('helper/helper_recommendations', { title: 'HappyHelper - Recommendations', users:result});
            });
        }
        else{
            var helper = record.assigned;
            User.findOne({username:helper}).then(function(result){
                var recs = record.recommendations;
                res.render('recommendations', { title: 'HappyHelper - Recommendations', helper:result, recommendations:recs});
            });
        }
    });
});

router.post('/save-diary', function(req,res,next){
    var rating = req.body.happyRating;
    var text = req.body.happyComments;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var date = year+"-"+month+"-"+day;
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

router.get('/helper/view/:username', function(req,res,next){
    var username = req.params.username;
    User.findOne({username:username}).then(function(record){
        res.render('helper/view-user', { title: 'HappyHelper', user:record});
    });
});

router.post('/helper/recommendation/:username/create', function(req,res,next){
    var username = req.params.username;
    var recommendationName = req.body.name;
    var recommendationDescription = req.body.description;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var date = year+"-"+month+"-"+day;
    User.findOne({username:username}).then(function(record){
        record.recommendations.push({date:date, name:recommendationName, description:recommendationDescription});
        record.save();
        res.redirect('/helper/view/'+username);
    });
});

router.post('/habits/create', function(req,res,next){
    req.checkBody('name', 'Habit name required').notEmpty();

    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //Run the validators
    var errors = req.validationErrors();

    var name = req.body.name;
    var limit = req.body.limit;
    var unit = req.body.unit;

    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.push({name:name, unit:unit, limit:limit, uses_api:false});
        record.save();
        res.redirect('/habits');
    });
});

router.post('/add/sleep', function(req,res,next){
    var name = req.body.name;
    var limit = req.body.limit;
    var unit = req.body.units;

    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.push({name:name, unit:unit, limit:limit, uses_api:true});
        record.save();
        res.redirect('/habits');
    });
});

router.post('/add/steps', function(req,res,next){
    var name = req.body.name;
    var limit = req.body.limit;
    var unit = req.body.units;

    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.push({name:name, unit:unit, limit:limit, uses_api:true});
        record.save();
        res.redirect('/habits');
    });
});

router.post('/add/bp', function(req,res,next){
    var name = req.body.name;
    var limit1 = req.body.limit1;
    var unit = req.body.units;

    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.push({name:name, unit:unit, limit:limit1, uses_api:true});
        record.save();
        res.redirect('/habits');
    });
});

router.post('/add/vitD', function(req,res,next){
    var name = req.body.name;
    var limit = req.body.limit;
    var unit = req.body.units;

    User.findOne({_id:req.session.passport.user}).then(function(record){
        record.habits.push({name:name, unit:unit, limit:limit, uses_api:true});
        record.save();
        res.redirect('/habits');
    });
});




router.get('/habits/create', function(req,res,next){
    res.render('habit_form', { title: 'HappyHelper - add custom habit' });
});

router.get('/habits/:name', function(req,res,next){
    var name = req.params.name;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var date = year+"-"+month+"-"+day;
    User.findOne({_id:req.session.passport.user}).then(function(record){
        for(var i=0; i<record.habits.length;i++){
            if(record.habits[i].name == name){
                var habit = record.habits[i];
            }
        }


        for(var i=0; i<record.tracked_stats.length;i++){
            if(record.tracked_stats[i].name == name){
                var tracked_stat = record.tracked_stats[i];
            }
        }

        var tracked = record.tracked_stats;

        var diaryEntries = record.diaryEntries;
        

        // hold data required for graphs
        var trackedAndMood = [];


        // match the habit
        for (var i=0; i<tracked.length; i++){
            if(tracked[i].name == name){
                // need remainder and whole value for alcohol unit bottles
                trackedAndMood.push({"date":tracked[i].date, "value": tracked[i].value, "name":tracked[i].name, "rating":"0", "wholeValue":(tracked[i].value - (tracked[i].value % 1)), "remainderValue": (tracked[i].value % 1)});   
            }
        }

        for (var i=0; i<trackedAndMood.length; i++){
            for (var j=0; j<diaryEntries.length; j++){
                if((trackedAndMood[i].date == diaryEntries[j].date) && (trackedAndMood[i].name == name)){
                    trackedAndMood[i].rating = diaryEntries[j].rating;
                } 
            }


        }

     
       

        console.log(trackedAndMood);
        todays = []
        for (var i=0; i<tracked.length; i++){
            if(tracked[i].date == date){
                todays.push(tracked[i]);
            }
        }

        for (var j=0;j<todays.length;j++){
            if (todays[j].name == name){
                var todaysHab = todays[j];
            }
        }
        res.render('habit_detail', {trackedAndMood:trackedAndMood, habit: habit, today:date, todaysHab:todaysHab, tracked_stat:tracked_stat});

    });
});

router.get('/delete/:habit', function(req,res,next){
    var name = req.params.habit;
    User.findOne({_id:req.session.passport.user}).then(function(record){
        for(var i=0; i<record.habits.length;i++){
            if(record.habits[i].name == name){
                var habit = record.habits[i];
            }
        }
        record.habits.pull(habit);
        record.save();
        res.redirect('/habits');
    });
});

router.post('/update/:name', function(req,res,next){
    var name = req.params.name;
    var value = req.body.habitVal;
    var date = req.body.date;
    User.findOne({_id:req.session.passport.user}).then(function(record){
        var tracked_stats = record.tracked_stats;
        var sameDate = [];
        for (var i=0;i<tracked_stats.length;i++){
            if(tracked_stats[i].date == date){
                console.log("Same DATE!");
                sameDate.push(tracked_stats[i])
            }
        }

        var update = -1;
        for (var i=0;i<sameDate.length;i++){
            if(sameDate[i].name == name){
                update = i;
            }
        }
        if (update>-1){
            record.tracked_stats[update].value = value;
            record.save().then(function(){
                console.log(record.tracked_stats);
                res.redirect('/habits');
            });
        } else {
            record.tracked_stats.push({name:name, date:date, value:value});
            record.save().then(function(){
                res.redirect('/habits');
            });
        }
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
