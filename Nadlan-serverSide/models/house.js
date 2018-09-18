var mongoose = require('mongoose');

//house schema

var houseSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    types:{
        type: String,
        require: true
    },
    create_date:{
        type: Date,
        default: Date.now
    },
    rooms:{
        type: Number,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    area:{
        type: String,
        require: true
    },
    url:{
        type:String,
        require: true
    },
    title:{
        type:String,
        require: true
    },
    deal:{
        type:String,
        require: true
    }

});

var House = module.exports = mongoose.model("House", houseSchema);

// get houses

module.exports.getHouses = function(callback, limit){
    House.find(callback).limit(limit);
}


// get house
module.exports.getHouseById = function(id,callback){
    House.findById(id,callback);
}

// add house


module.exports.addHouse = function(house, callback){
    House.create(house, callback);
}


// Update house price

module.exports.updateHouse = function(id, house, options, callback){
    var query = {_id: id};

    var update = {
        price: house.price,
    }


    House.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeHouse = function(id, callback){
    var query = {_id: id};
    House.remove(query, callback);
}