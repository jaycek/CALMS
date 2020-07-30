export class TaskDetail{

    constructor(
        public email:String,
        public servicetype:String,
        public consumernum:String,
        public scheduleddate:Date,
        public testname:String,
        public completed:boolean,
        public contact:Number,
        public paymentfreq:String,
        public paymentdate:Number
    ){}
}