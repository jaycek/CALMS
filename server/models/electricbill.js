const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ebSchema = new Schema({
    email:String,
    consumernum:String,
    paymentfreq:String,
    dateofpayment:Number,
    userID:String,
    registeredDate:Date
});

module.exports=mongoose.model('electricbill',ebSchema, 'electricbills');
