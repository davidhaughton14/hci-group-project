var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const HabitTypeSchema = mongoose.Schema({
	name:{
		type:String
	},
	unit:{
		type:String
	},
	limit:{
		type:Number
	},
	uses_api:{
		type: Boolean
	},
	_id:false
});

const RecommendationsSchema = mongoose.Schema({
	date:{
		type:String
	},
	name:{
		type:String
	},
	description:{
		type:String
	},
	_id:false
});

const DiarySchema = mongoose.Schema({
	date:{
		type:String
	},
	rating:{
		type:Number
	},
	text:{
		type:String
	},
	_id:false
});

const HabitSchema = new Schema({
    name: {
    	type: String
	},
	date: {
	   type:String
    },
    value: {
	   type: String
    },
	_id: false
});

// User Schema
const UserSchema = new Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	helper_flag:{
		type: Number
	},
	about:{
		type: String
	},
	habits:[HabitTypeSchema],
	tracked_stats: [HabitSchema],
	diaryEntries: [DiarySchema],
	meetups:[String],
	assigned:[String],
	recommendations:[RecommendationsSchema]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
