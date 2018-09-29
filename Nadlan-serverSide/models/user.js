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


const User = module.exports = mongoose.model('User', UserSchema);
//adding new account
/*module.exports.addUser = function(newUser, callback){
   User.create(newUser, callback);
}*/


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