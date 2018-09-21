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



//adding new account
module.exports.addUser = function(user, callback){
   User.create(user, callback);
}


const User = module.exports = mongoose.model('User', UserSchema);