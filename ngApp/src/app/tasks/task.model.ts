export class Task{
        
        constructor(
            public userID:String,
            public email:String,
            public servicetype:String,
            public scheduleddate:Date,
            public completed:Boolean
        ){}

}