var express = require('express');
var router = express.Router();

// Require controller modules
var habit_controller = require('../controllers/habitController');


/// AUTHOR ROUTES ///

/* GET request for creating Habit. NOTE This must come before route for id (i.e. display author) */
router.get('/habit/create', author_controller.habit_create_get);

/* POST request for creating Habit. */
router.post('/habit/create', author_controller.habit_create_post);

/* GET request to delete Habit. */
router.get('/habit/:id/delete', author_controller.habit_delete_get);

// POST request to delete Habit
router.post('/habit/:id/delete', author_controller.habit_delete_post);

/* GET request to update Habit. */
router.get('/habit/:id/update', author_controller.habit_update_get);

// POST request to update Habit
router.post('/habit/:id/update', author_controller.habit_update_post);

/* GET request for one Habit. */
router.get('/habit/:id', author_controller.habit_detail);

/* GET request for list of all Authors. */
router.get('/habits', author_controller.habit_list);



module.exports = router;