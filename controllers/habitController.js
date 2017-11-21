var Habit = require('../models/habit');

// Display list of all Habits
exports.habit_list = function(req, res, next) {
    Habit.find()
    .exec(function (err, habits_list) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('habits', { title: 'Habit List', habits: habits_list });
    });
};
var async = require('async');

// Display detail page for a specific Habit
exports.habit_detail = function(req, res) {
    async.parallel({
    habit: function(callback) {     
      Habit.findById(req.params.id)
        .exec(callback);
    },

  }, function(err, results) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('habit_detail', { title: 'Habit Detail', habit: results.habit });
  });
};

// Display Habit create form on GET
exports.habit_create_get = function(req, res) {
    res.render('habit_form', { title: 'Add Habit' });
};

// Handle Habit create on POST
exports.habit_create_post = function(req, res) {
    //Check that the name field is not empty
    req.checkBody('name', 'Habit name required').notEmpty(); 
    
    //Trim and escape the name field. 
    req.sanitize('name').escape();
    req.sanitize('name').trim();
    
    //Run the validators
    var errors = req.validationErrors();

    //Create a habit object with escaped and trimmed data.
    var habit = new Habit(
      { name: req.body.name }
    );
    
    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('habit_form', { title: 'Create Habit', habit: habit, errors: errors});
    return;
    } 
    else {
        // Data from form is valid.
        //Check if Habit with same name already exists
        Habit.findOne({ 'name': req.body.name })
            .exec( function(err, found_habit) {
                 console.log('found_habit: ' + found_habit);
                 if (err) { return next(err); }
                 
                 if (found_habit) { 
                     //Habit exists, redirect to its detail page
                     res.redirect(found_habit.url);
                 }
                 else {
                     
                     habit.save(function (err) {
                       if (err) { return next(err); }
                       //Habit saved. Redirect to habit detail page
                       res.redirect(habit.url);
                     });
                     
                 }
                 
             });
    }
};

// Display Habit delete form on GET
exports.habit_delete_get = function(req, res) {
     async.parallel({
    habit: function(callback) {     
      Habit.findById(req.params.id)
        .exec(callback);
    },

  }, function(err, results) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('habit_delete', { title: 'Delete Habit', habit: results.habit });
  });
};

// Handle Habit delete on POST
exports.habit_delete_post = function(req, res) {
    req.checkBody('habitid', 'Habit id must exist').notEmpty();  
    
    async.parallel({
        author: function(callback) {     
            Habit.findById(req.body.habitid).exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        //Success   

            Habit.findByIdAndRemove(req.body.habitid, function deleteHabit(err) {
                if (err) { return next(err); }
                //Success - goto habit list
                res.redirect('/habits');
            });

        
    });
};

// Display Habit update form on GET
exports.habit_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit update GET');
};

// Handle Habit update on POST
exports.habit_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit update POST');
};