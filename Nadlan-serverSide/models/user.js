const mongoose = require('mongoose');

// user schema

const UserSchema = mongoose.Schema({
    name:{
        type: string,
        require: true
    },
    email:{
        type: string,
        require: true
    },
    username:{
        type: string,
        require: true
    },
    password:{
        type: string,
        require: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);