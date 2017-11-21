var Habit = require('../models/habit');

// Display list of all Habits
exports.habit_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit list');
};

// Display detail page for a specific Habit
exports.habit_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit detail: ' + req.params.id);
};

// Display Habit create form on GET
exports.habit_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit create GET');
};

// Handle Habit create on POST
exports.habit_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit create POST');
};

// Display Habit delete form on GET
exports.habit_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit delete GET');
};

// Handle Habit delete on POST
exports.habit_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit delete POST');
};

// Display Habit update form on GET
exports.habit_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit update GET');
};

// Handle Habit update on POST
exports.habit_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Habit update POST');
};