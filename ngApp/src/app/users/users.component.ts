import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../auth.service';
import {User} from '../profile/User.model';
import {UtilsService} from '../utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _auth: AuthService,private _utils:UtilsService) { }

  users:User[];
  ngOnInit(): void {
    
    this._auth.getUsers()
    .subscribe(
      res=>{
        console.log(res);
        this.users = JSON.parse(JSON.stringify(res));

      },
      err=>
      {
        console.log(err);

      }

    )
  }

  deleteUser(id){

    if(confirm("Are you sure you want to delete the User and related services and tasks?")==true){
      this._auth.deleteUser(id.toString())
      .subscribe(
        res=>
        {
           this.users = JSON.parse(JSON.stringify(res)); 
           //delete all Electricity bills for the user
           this._utils.deleteEBService(id.toString())
           .subscribe(
             res=>{
              console.log("All eb services for user deleted");
              this._utils.deleteLabService(id.toString())
              .subscribe(

                res=>
                {
                  this._utils.deletetasksforUser(id.toString())
                  .subscribe(
                    res=>{
                      
                        console.log("All tasks for user deleted");
                    },
                    err=>
                    {
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
        },
        
          err=>{
            console.log(err);
        }
      )
    }

  }
}
