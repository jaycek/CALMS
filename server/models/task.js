const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const taskSchema = new Schema(
        { 
            userID:String,
            email:String,
            servicetype:String,
            scheduleddate:Date,
            completed:Boolean

        }
)
module.exports = mongoose.model('task',taskSchema,'tasks');
