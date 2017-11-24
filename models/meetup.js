var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetupSchema = mongoose.Schema({
	name:{
		type: String
	},
	date:{
		type: String
	},
	time:{
		type: String
	},
	attending:{
		type: [String],
		default:[]
	},
	location:{
		type: String
	}
});

var Meetup = mongoose.model('Meetup', MeetupSchema);
module.exports = Meetup;
