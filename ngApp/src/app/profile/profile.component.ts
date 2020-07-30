import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from './User.model';
import {UtilsService} from '../utils.service';
import {Service} from './service.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _auth: AuthService,private _utils:UtilsService, private _route:Router) { }
  
  userID;
  user =new User(null,null,null,null);
  ebdata;
  services:Service[]=[];
  service= new Service(null,null,false,false);
  serviceType;
  labdata;
  
ngOnChanges():void{

  this.loadServices(); 
  
}

  ngOnInit(): void {
     this.loadServices();
  }

  loadServices(){
    this.userID=localStorage.getItem('CALMSuserID');
    this._auth.getUserDetails(this.userID.toString())
    .subscribe(
      res=>{
        this.user = JSON.parse(JSON.stringify(res));
        console.log(this.userID.toString());
        //Get EB services details
        this._utils.getEBService(this.userID.toString())
        .subscribe(
          res=>{
            console.log(res);
              this.ebdata= JSON.parse(JSON.stringify(res));
              if(this.ebdata !=null){
              this.service=new Service("Electricity Bill Payment",this.ebdata.registeredDate,true,false);
              this.services.push(this.service);
              }
              console.log(this.services);

              //get Lab services details
              this._utils.getLabService(this.userID.toString())
              .subscribe(
                  res=>{
                      this.labdata=JSON.parse(JSON.stringify(res));
                      console.log(this.labdata);
                      if(this.labdata != null){
                        this.service=new Service("Lab@Home service",this.labdata.registeredDate,false,true);
                        this.services.push(this.service);
                      }
                      console.log(this.services);
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
        
      },
      err=>{
          console.log(err);
      }
    )      
  }

  edit(type){
    if(type=="Electricity Bill Payment"){
      this._route.navigate(['/ebilledit']);
    }
    else if(type=="Lab@Home service"){
      this._route.navigate(['/labedit']);
    }
  }
  deletebill(type){

    console.log(type);
    if(type=="Electricity Bill Payment"){
      this.serviceType="eb";
    }
    else if(type=="Lab@Home service"){
      this.serviceType="lab";
    }
    
    if(confirm("Are you sure you want to delete this service and related tasks?")==true){
      if(this.serviceType=='eb'){
        
      this._utils.deleteEBService(this.userID) 
      .subscribe((data)=>{
                
          
        //  this.service=JSON.parse(JSON.stringify(data));
        //  if(this.service !=null){
        //   this.service=new Service("Electricity Bill Payment",this.ebdata.registeredDate,true,false);
        //   this.services.push(this.service);
        //  }
         
         this._utils.deletetasksforuserandservicetype(this.userID,this.serviceType)
         .subscribe(
          res=>{
            console.log("Tasks deleted");
            this.services=[];
          this.loadServices();
          },
          err=>{
            console.log(err);
          }

         )
        console.log(data); 
      })
      }

      else if(this.serviceType=='lab'){
        this._utils.deleteLabService(this.userID) 
        .subscribe((data)=>{
                  
             this.services=[];
          //  this.service=JSON.parse(JSON.stringify(data));
          //  if(this.service !=null){
          //   this.service=new Service("Lab@Home Service",this.labdata.registeredDate,false,true);
          //   this.services.push(this.service);
          //  }
           
           this._utils.deletetasksforuserandservicetype(this.userID,this.serviceType)
           .subscribe(
            res=>{
              console.log("Tasks deleted");
              this.services=[];
          this.loadServices();
            },
            err=>{
              console.log(err);
            }
  
           )
          console.log(data); 
        })
      }
  }
}
}

