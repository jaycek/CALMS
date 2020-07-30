import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Task} from '../tasks/task.model';

@Component({
  selector: 'app-lab-edit',
  templateUrl: './lab-edit.component.html',
  styleUrls: ['./lab-edit.component.css']
})
export class LabEditComponent implements OnInit {

  
  numbers:Number[]=[];
  useremail ;
  freqoptions;
  selectedFreq;
  userID;
  
   
  labdetail= {userID:"",email:"",registeredDate:null,testname:"",visitfreq:"",visitdate:null};
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
  
   }
  

   labForm= this.fb.group(
    {
      testname:['',[Validators.required]],
      visitfreq:['',[Validators.required]],
      visitdate:['',[Validators.required]],

  })

  ngOnInit(): void {
    this.numbers = Array(30).fill(0).map((x,i)=>i+1);  
    this.freqoptions=["Monthly","Bimonthly"];

    this.userID=this._auth.getLoggedInUserID();
    this._utils.getLabService(this.userID.toString())
    .subscribe(
      res=>{
        console.log(res);
          this.labdetail= JSON.parse(JSON.stringify(res));
          this.labdetail.userID=this.userID.toString();
          
      },
      err=>{
        console.log(err);
      }

    )
  }

  update(){

    this.useremail  = this._auth.getLoggedInUseremail();
    this.userID  = this._auth.getLoggedInUserID();
    this.nowDate= new Date();  
    this.currmonth = this.nowDate.getMonth() ;
    this.currDate=this.nowDate.getDate();
    this.curryear=this.nowDate.getFullYear();
    console.log(this.currmonth);
    
    // this.labdetail={userID:this.userID.toString(), testname:this.labForm.get('testname').value,
    // visitfreq:this.labForm.get('visitfreq').value,visitdate:this.labForm.get('visitdate').value};

    this._utils.updateLabservice(this.labdetail)
    .subscribe(
        res=>{
          console.log(res);
          
          if(this.labForm.get('visitdate').touched || this.labForm.get('visitfreq').touched){

            if(this.labForm.get('visitfreq').value =="Monthly"){
              if(this.currmonth ==11 && this.labForm.get('visitdate').value< this.currDate ){
                this.scheduledmonth=0;
                this.scheduledyear=this.curryear+1;
              }
              else if(this.labForm.get('visitdate').value> this.currDate) {
                this.scheduledmonth=this.currmonth;
                this.scheduledyear=this.curryear;
              }
              else{
                this.scheduledmonth=this.currmonth +1;
                this.scheduledyear=this.curryear;
              }
           }
           if(this.labForm.get('visitfreq').value =="Bimonthly"){
              if(this.currmonth ==11|| this.currmonth ==10 && this.labForm.get('visitdate').value< this.currDate ){
                this.scheduledmonth=1;
                this.scheduledyear=this.curryear+1;
              }
              else if(this.labForm.get('visitdate').value> this.currDate) {
                this.scheduledmonth=this.currmonth;
                this.scheduledyear=this.curryear;
              }
              else{
                this.scheduledmonth=this.currmonth+2;
                this.scheduledyear=this.curryear;
              }
           }
           this.scheduledday=this.labForm.get('visitdate').value;
    
           this.task= {userID:this.userID,email:this.useremail,servicetype:'lab',scheduleddate:new Date(this.scheduledyear,this.scheduledmonth,this.scheduledday),completed:false};
        
        this._utils.updatetask(this.task)
            .subscribe(
            res=>{
              console.log(res);
              this._router.navigate(['/profile']);
            },
            err=>{
            console.log(err);
            }
          )
                       
          }
          
        
       
        },
        err=>{
          console.log(err);
        }

    )


  }

}
