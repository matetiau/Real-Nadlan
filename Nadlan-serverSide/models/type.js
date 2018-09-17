var mongoose = require('mongoose');

//type schema

var typesSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

var Type = module.exports = mongoose.model("Types", typesSchema);

// get types

module.exports.getTypes = function(callback, limit){
    Type.find(callback).limit(limit);
}

// add type

module.exports.addType = function(type, callback){
    Type.create(type, callback);
}

// update type
module.exports.updateType = function(id, type, options, callback){
    var query = {_id: id};

    var update = {
        name: type.name
    }
    Type.findOneAndUpdate(query, update, options, callback);
}


// delete type

module.exports.deleteType = function(id, callback){
    var query = {_id: id}
    Type.remove(query, callback);
}