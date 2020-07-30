import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Task} from '../tasks/task.model';

@Component({
  selector: 'app-ebillsubscribe',
  templateUrl: './ebillsubscribe.component.html',
  styleUrls: ['./ebillsubscribe.component.css']
})
export class EbillsubscribeComponent implements OnInit {

  
  numbers:Number[]=[];
  useremail ;
  freqoptions;
  selectedFreq;
  ebillData;
  userID;
  // today:String;
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
   }
  
  

   ebillForm= this.fb.group(
    {
      consumer:['',[Validators.required]],
      paymentfreq:['',[Validators.required]],
      paymentdate:['',[Validators.required]]
  }

   )
  ngOnInit(): void {
  
  }
  
  subscribe(pay){
    
    
    this.useremail  = this._auth.getLoggedInUseremail();
  
    this.userID  = this._auth.getLoggedInUserID();
    this.nowDate= new Date();  

     this.ebillData={userID:this.userID, email:this.useremail,registeredDate:this.nowDate, consumernum:this.ebillForm.get('consumer').value,
        paymentfreq:this.ebillForm.get('paymentfreq').value,dateofpayment:this.ebillForm.get('paymentdate').value};

    this.currmonth = this.nowDate.getMonth() ;
    this.currDate=this.nowDate.getDate();
    this.curryear=this.nowDate.getFullYear();
    console.log(this.currmonth);
    
        // console.log(this.ebillData);
    this._utils.addEbill(this.ebillData)
    .subscribe(
      res=>{
        console.log(res);
       
        if(this.ebillForm.get('paymentfreq').value =="Monthly"){
            if(this.currmonth ==11 && this.ebillForm.get('paymentdate').value< this.currDate ){
              this.scheduledmonth=0;
              this.scheduledyear=this.curryear+1;
            }
            else if(this.ebillForm.get('paymentdate').value> this.currDate) {
              this.scheduledmonth=this.currmonth;
              this.scheduledyear=this.curryear;
            }
            else{
              this.scheduledmonth=this.currmonth +1;
              this.scheduledyear=this.curryear;
            }
         }
         if(this.ebillForm.get('paymentfreq').value =="Bimonthly"){
            if(this.currmonth ==11|| this.currmonth ==10 && this.ebillForm.get('paymentdate').value< this.currDate ){
              this.scheduledmonth=1;
              this.scheduledyear=this.curryear+1;
            }
            else if(this.ebillForm.get('paymentdate').value> this.currDate) {
              this.scheduledmonth=this.currmonth;
              this.scheduledyear=this.curryear;
            }
            else{
              this.scheduledmonth=this.currmonth+2;
              this.scheduledyear=this.curryear;
            }
         }
       
        this.scheduledday=this.ebillForm.get('paymentdate').value;
    
        this.scheduleddate=new Date(this.scheduledyear,this.scheduledmonth,this.scheduledday);
    
        console.log("Scheduled date is "+ this.scheduleddate);
        this.task= {userID:this.userID,email:this.useremail,servicetype:'eb',scheduleddate:this.scheduleddate,completed:false};
        console.log(this.task);
        this._utils.addTask(this.task)
            .subscribe(
            res=>{
              console.log(res);
              if(pay){
                this._router.navigate(['/payment']);
              }
              else
              {
                this._router.navigate(['/profile']);
              }
              
            },
            err=>{
            console.log(err);
            }
          )
       
      },
      err=>{
        console.log(err);
        //handle server side errors
        if(err instanceof HttpErrorResponse){
          const validationError = err.error;
           if(err.status === 422){
            this.ebillForm.get('paymentdate').setErrors({ serverError: validationError}); 
          }
        }


      }
    )


  }

  
}
