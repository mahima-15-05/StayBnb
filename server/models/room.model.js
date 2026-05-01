const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true},
    location:{type:String, required:true},
    images:[String],
    amenities:[String],
    isAvailable:{
        type:Boolean,default:true
    }
},{timestamps:true});

module.exports = mongoose.model("Room", roomSchema);