import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Task} from '../tasks/task.model';

@Component({
  selector: 'app-ebill-edit',
  templateUrl: './ebill-edit.component.html',
  styleUrls: ['./ebill-edit.component.css']
})
export class EbillEditComponent implements OnInit {

  
  
  numbers:Number[]=[];
  useremail ;
  freqoptions;
  selectedFreq;
  userID;
  today:Date;
  nowDate:Date;
  task=new Task("","","",null,false);
  scheduleddate:Date;
  //to calculate scheduled date of task
  currmonth;
  scheduledmonth;
  curryear;
  scheduledyear;
  currDate;
scheduledday;


  constructor(private _utils: UtilsService,private _router:Router,private fb:FormBuilder,private _auth:AuthService)  {
    this.numbers = Array(30).fill(0).map((x,i)=>i+1);  
    this.freqoptions=["Monthly","Bimonthly"];
    
    this.userID=this._auth.getLoggedInUserID();
    this._utils.getEBService(this.userID.toString())
    .subscribe(
      res=>{
        console.log(res);
          this.ebdata= JSON.parse(JSON.stringify(res));
          this.ebdata.userID=this.userID.toString();
          
      },
      err=>{
        console.log(err);
      }

    )
   }
  
   ebdata={userID:"",consumernum:"",paymentfreq:"",dateofpayment:undefined};
   
   ebillForm= this.fb.group(
    {
      consumer:['',[Validators.required]],
      paymentfreq:['',[Validators.required]],
      dateofpayment:['',[Validators.required]]
  }

   )

  ngOnInit(): void {

    
  }

  update(){
    

    this.nowDate= new Date();
    
    this.currmonth = this.nowDate.getMonth() ;
    this.currDate=this.nowDate.getDate();
    this.curryear=this.nowDate.getFullYear();

     this._utils.updateEBService(this.ebdata)
      .subscribe(res=>{
              
//update task on;y if there is change in payment date or paymentfrequency
      if(this.ebillForm.get('paymentfreq').touched || this.ebillForm.get('paymentdate').touched) {
        
            if(this.ebillForm.get('paymentfreq').value =="Monthly"){
              //for dec month and monthly freq and payment date is past current date,schedule for next month
              //and next year
              if(this.currmonth ==11 && this.ebillForm.get('dateofpayment').value< this.currDate ){
                this.scheduledmonth=0;
                this.scheduledyear=this.curryear+1;
              }
              //if payment date is not over for current month, schedule for current month
              else if(this.ebillForm.get('dateofpayment').value> this.currDate) {
                this.scheduledmonth=this.currmonth;
                this.scheduledyear=this.curryear;
              }
              else{
                //Not Dec, other cases, schedule for next month, current year
                this.scheduledmonth=this.currmonth +1;
                this.scheduledyear=this.curryear;
              }
          }
          //repeat above cases for Bi monthly..only increment by 2 months
          if(this.ebillForm.get('paymentfreq').value =="Bimonthly"){
              if(this.currmonth ==11|| this.currmonth ==10 && this.ebillForm.get('dateofpayment').value< this.currDate ){
                this.scheduledmonth=1;
                this.scheduledyear=this.curryear+1;
              }
              else if(this.ebillForm.get('dateofpayment').value> this.currDate) {
                this.scheduledmonth=this.currmonth;
                this.scheduledyear=this.curryear;
              }
              else{
                this.scheduledmonth=this.currmonth+2;
                this.scheduledyear=this.curryear;
              }
          }
        
          this.scheduledday=this.ebillForm.get('dateofpayment').value;
          console.log("New day" + this.scheduledday);
          console.log("New month"+ this.scheduledmonth);
          console.log("New year"+ this.scheduledyear);

          this.scheduleddate=new Date(this.scheduledyear,this.scheduledmonth,this.scheduledday);
      
          console.log("Scheduled date is "+ this.scheduleddate);
          this.task= {userID:this.userID,email:this.useremail,servicetype:'eb',scheduleddate:this.scheduleddate,completed:false};
          
          this._utils.updatetask(this.task)
            .subscribe(
            res=>{
              console.log(res);
              
            },
          err=>{
            console.log(err);
          }
             )

      }
       
      
      
      })
      this._router.navigate(['/profile']);
      }

}
