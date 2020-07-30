import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {UtilsService} from '../utils.service';
import {TaskDetail} from '../tasks/taskdetail.model';
import {AuthService} from '../auth.service';
import {Task} from '../tasks/task.model';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  taskid;
  task:TaskDetail = new TaskDetail("","","",null,"",false,null,"",null);
  taskdata;
  ebdata;
  userID ;
  userDetails;
  isEBservice=false;
  isLabservice=false;
  labdata;

  //for setting scheduled date of new task
  today:Date;
  nowDate:Date;
  newtask=new Task("","","",null,false);
  scheduleddate:Date;
  currmonth;
  scheduledmonth;
  curryear;
  scheduledyear;
  currDate;
  scheduledday;
   activedate:Date ;
  mail={email:"",subject:"",text:""};
  frequency;
  nextdate;
  constructor(private route:ActivatedRoute,private _router:Router,private _utils :UtilsService,private _auth:AuthService)
   {

    this.route.params.subscribe(
      params=>{
          this.taskid = params['id'];
          console.log(this.taskid);
      })
   
      this._utils.getsingletask(this.taskid.toString())
      .subscribe(
        res=>{
          this.taskdata = JSON.parse(JSON.stringify(res));
          
          if(this.taskdata.servicetype=="eb"){
            this.isEBservice=true;
          }
          else if(this.taskdata.servicetype=='lab'){
            this.isLabservice=true;
          }

          //populating the taskdetail 
          this.task.email= this.taskdata.email;
          this.task.servicetype=this.taskdata.servicetype;
          
          this.task.scheduleddate=this.taskdata.scheduleddate;
          this.task.completed=this.taskdata.completed;
         this.userID = this.taskdata.userID;
         this._auth.getUserDetails(this.userID.toString())
         .subscribe(
           res=> {
               this.userDetails=JSON.parse(JSON.stringify(res));
               this.task.contact=this.userDetails.contact;
           },
           err=>{
             console.log(err)
           })

          if(this.isEBservice){
            this._utils.getEBService(this.userID.toString())
            .subscribe(
              res=>{
                this.ebdata = JSON.parse(JSON.stringify(res));
                console.log(this.ebdata);
                this.task.consumernum=this.ebdata.consumernum;
                this.task.paymentfreq=this.ebdata.paymentfreq;
                this.task.paymentdate=this.ebdata.dateofpayment;
                  
              },
              err=>{
                console.log(err);
              })
          }
          else if(this.isLabservice){
                this._utils.getLabService(this.userID.toString())
                .subscribe(
                    res=>{
                      this.labdata=JSON.parse(JSON.stringify(res));
                      this.task.testname= this.labdata.testname;
                      this.task.paymentdate=this.labdata.visitdate;
                      this.task.paymentfreq=this.labdata.visitfreq;
                    },
                    err=>{
                      console.log(err);
                    }

                )
          }
          

        },
        err=>{
            console.log(err);

        })
      


    }

  ngOnInit(): void {

  }

  completeTask(){
    
    
        this.frequency = this.task.paymentfreq;
        this.nextdate=this.task.paymentdate;
   


    if (confirm("An email confirmation will be sent to the client. Are you sure you want to continue?") == true){
      
     
    this.activedate= new Date(this.task.scheduleddate);
    console.log(this.task.scheduleddate);

    this.currmonth = this.activedate.getMonth() ;
    console.log(this.currmonth);
    this.curryear=this.activedate.getFullYear();

    this._utils.completetask(this.taskdata._id.toString())
    .subscribe(
      res=>{
        if(this.frequency =="Monthly"){
          if(this.currmonth ==11 ){
            this.scheduledmonth=0;
            this.scheduledyear=this.curryear+1;
          }
                
          else{
            this.scheduledmonth=this.currmonth +1;
            this.scheduledyear=this.curryear;
          }
       }
       if(this.frequency =="Bimonthly"){
          if(this.currmonth ==11|| this.currmonth ==10 ){
            this.scheduledmonth=1;
            this.scheduledyear=this.curryear+1;
          }
          else{
            this.scheduledmonth=this.currmonth+2;
            this.scheduledyear=this.curryear;
          }
       }
     
      this.scheduledday=this.nextdate;
  console.log(this.nextdate+"Scheduledday");
      this.scheduleddate=new Date(this.scheduledyear,this.scheduledmonth,this.scheduledday,0,0,0,0);
  
      console.log("Scheduled date is "+ this.scheduleddate);
      this.newtask= {userID:this.userID,email:this.userDetails.email,servicetype: this.task.servicetype,scheduleddate:this.scheduleddate,completed:false};
      
      this._utils.addTask(this.newtask)
          .subscribe(
          res=>{
            console.log(res);
            this._router.navigate(['/tasks']);
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
     
    //  Mail confirmation code starts
      this.mail.email=this.userDetails.email;
      if(this.task.servicetype == 'eb'){
        this.mail.subject="Electricity Bill Payment - CALMS - Confirmation";
        
        this.mail.text=`Electricity Bill Payment scheduled for ${this.activedate} has been completed` ;
      }
      else if(this.task.servicetype=='lab')
      {
        this.mail.subject="Lab@home Service - CALMS - Call confirmation";
        
        this.mail.text=`Lab visit has been scheduled for ${this.activedate}` ;

      }
      
      this._utils.sendmail(this.mail)
        .subscribe(
          res=>{
            console.log(res);
          },
          err=>{
            console.log(err);
          }

        )
    }
    //  Mail confirmation code ends

    

}
