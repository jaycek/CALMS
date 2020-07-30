const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const labSchema = new Schema({
    email:String,
    testname:String,
    visitfreq:String,
    visitdate:Number,
    userID:String,
    registeredDate:Date
});

module.exports=mongoose.model('labservicedetail',labSchema, 'labservicedetails');
