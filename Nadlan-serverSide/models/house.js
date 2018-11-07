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
        type: String,
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
    },
    houseImages:{
        type:Array,
        require: true
    },

    user:{
        type:String,
        require:true
    },
    media:{
        type:Array,
        require:true
    }
    


});

var House = module.exports = mongoose.model("House", houseSchema);

// get houses

module.exports.getHouses = function(callback, limit){
    House.find(callback).limit(13);
}




// get house
module.exports.getHouseById = function(id,callback){
    House.findById(id,callback);
}

// get specfic group of houses


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

//remove house from db

module.exports.removeHouse = function(id, callback){
    var query = {_id: id};
    House.remove(query, callback);
}

//update house to premium house

module.exports.updateHousePremium = function(id, house, options, callback){
    var query = {_id: id};

    var update = {
        premiumHouse: house.premiumHouse,
    }


    House.findOneAndUpdate(query, update, options, callback);
}