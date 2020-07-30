
import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Task} from '../tasks/task.model';
import {Labdetail} from '../lab-home/labdetail.model';


@Component({
  selector: 'app-lab-home',
  templateUrl: './lab-home.component.html',
  styleUrls: ['./lab-home.component.css']
})
export class LabHomeComponent implements OnInit {

  
  constructor(private _utils: UtilsService,private _router:Router,private fb:FormBuilder,private _auth:AuthService)  {
    this.numbers = Array(30).fill(0).map((x,i)=>i+1);  
    this.freqoptions=["Monthly","Bimonthly"];
   }
  
   numbers:Number[]=[];
   useremail ;
   freqoptions;
   selectedFreq;
   userID;
   labdetail:Labdetail= new Labdetail("", "","",null, "",null);
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

   labForm= this.fb.group(
    {
      testname:['',[Validators.required]],
      visitfreq:['',[Validators.required]],
      visitdate:['',[Validators.required]],

  })

  ngOnInit(): void {
  }

  subscribe(){

    
    this.useremail  = this._auth.getLoggedInUseremail();
    this.userID  = this._auth.getLoggedInUserID();
    this.nowDate= new Date();  
    this.currmonth = this.nowDate.getMonth() ;
    this.currDate=this.nowDate.getDate();
    this.curryear=this.nowDate.getFullYear();
    console.log(this.currmonth);
    
    this.labdetail={userID:this.userID, email:this.useremail,registeredDate:this.nowDate, testname:this.labForm.get('testname').value,
    visitfreq:this.labForm.get('visitfreq').value,visitdate:this.labForm.get('visitdate').value};

    this._utils.addlabservice(this.labdetail)
    .subscribe(
        res=>{
          console.log(res);
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
    
        // this.scheduleddate=new Date(this.scheduledyear,this.scheduledmonth,this.scheduledday);
    console.log(this.scheduledmonth);
    console.log(this.scheduledday);
    console.log(this.scheduleddate);
        console.log("Scheduled date is "+ this.scheduleddate);
        this.task= {userID:this.userID,email:this.useremail,servicetype:'lab',scheduleddate:new Date(this.scheduledyear,this.scheduledmonth,this.scheduledday),completed:false};
        
        this._utils.addTask(this.task)
            .subscribe(
            res=>{
              console.log(res);
              this._router.navigate(['/profile']);
            },
            err=>{
            console.log(err);
            }
          )
       
        },
        err=>{
          console.log(err);
        }

    )


  }
}
