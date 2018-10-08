const mongoose = require('mongoose');

// user schema

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
});


var User = module.exports = mongoose.model('User', UserSchema);


//get all users
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
}



//remove user from database
module.exports.removeUser = function(id, callback){
    var query = {_id: id};
    User.remove(query, callback);
}


//login 
module.exports.loginUser = function(id, callback){
    var query = {_id: id};
    User.remove(query, callback);
}