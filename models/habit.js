var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var HabitSchema = new Schema(
  {

    name: {
    	type: String}
  }
);
HabitSchema
.virtual('url')
.get(function () {
  return '/habits/' + this._id;
});

//Export model
module.exports = mongoose.model('Habit', HabitSchema);