var express = require('express');
var router = express.Router();

// Require controller modules
var habit_controller = require('../controllers/habitController');


/// HABIT ROUTES ///

// /* GET request for creating Habit. NOTE This must come before route for id (i.e. display author) */
// router.get('/create', habit_controller.habit_create_get);
//
// /* POST request for creating Habit. */
// router.post('/create', habit_controller.habit_create_post);

/* GET request to delete Habit. */
// router.get('/:id/delete', habit_controller.habit_delete_get);
//
// // POST request to delete Habit
// router.post('/:id/delete', habit_controller.habit_delete_post);

/* GET request to update Habit. */
router.get('/:id/update', habit_controller.habit_update_get);

// POST request to update Habit
router.post('/:id/update', habit_controller.habit_update_post);

// /* GET request for one Habit. */
// router.get('/:id', habit_controller.habit_detail);

/* GET request for list of all Habits. */
router.get('/', habit_controller.habit_list);


module.exports = router;
