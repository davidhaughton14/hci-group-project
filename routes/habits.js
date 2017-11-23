var express = require('express');
var router = express.Router();

// Require controller modules
var habit_controller = require('../controllers/habitController');


/* GET request to update Habit. */
router.get('/:id/update', habit_controller.habit_update_get);

// POST request to update Habit
router.post('/:id/update', habit_controller.habit_update_post);



module.exports = router;
