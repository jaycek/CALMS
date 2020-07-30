import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {User} from '../profile/User.model';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  loggedinuserID;

  constructor(private fb:FormBuilder,private _auth: AuthService,private router:Router) { }

  profile=new User(null,null,null,null);

  editProfileForm=this.fb.group(
    {
      name:['',Validators.required],
      address:['',Validators.required],
     
    contact:['',[ Validators.required,Validators.minLength(10),  
      Validators.maxLength(12),  
      Validators.pattern('^[0-9]*$')]]
    
    }
    )

  ngOnInit(): void {

    this.loggedinuserID=this._auth.getLoggedInUserID();
    this._auth.getUserDetails(this.loggedinuserID)
    .subscribe(
      res=>{
        this.profile=JSON.parse(JSON.stringify(res));
        
      },
      err=>{
        if(err instanceof HttpErrorResponse){
          const validationError = err.error;
     
          console.log(validationError);
        }
      }

    )
    
  }

  saveUser(){
    this._auth.saveUser(this.profile)
    .subscribe(data=>console.log(data))
    this.router.navigate(['/profile']);
  }
}
