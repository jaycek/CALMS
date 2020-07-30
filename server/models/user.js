const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:String,
    password:String,
    name:String,
    address:String,
    contact:Number

});

module.exports=mongoose.model('user',userSchema, 'users');
