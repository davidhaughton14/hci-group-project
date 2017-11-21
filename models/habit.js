var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HabitSchema = new Schema(
  {
    habit_name: {
    	type: String}
  }
);


//Export model
module.exports = mongoose.model('Habit', HabitSchema);