import { Component, OnInit } from '@angular/core';
import {AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { FormBuilder,Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  loginForm = this.fb.group(

    { email :['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.required]],
    password:['',[Validators.minLength(6),Validators.required]]
    }

  )
  
  loginUserDetails={email:"",password:""};
  isAdmin:Boolean=false;
  constructor(private _auth:AuthService,private _router:Router,private fb:FormBuilder) { }

  loginUser(){
    this._auth.loginUser(this.loginUserDetails)
    .subscribe(
      res=>{
        console.log(res);
        
        localStorage.setItem('token',res['token']);
        localStorage.setItem('CALMSuserID',res['id']);
        localStorage.setItem('CALMSemail',res['email']);

        if(res['isAdmin']==true){
          localStorage.setItem('isAdmin',res['isAdmin']);
          this._router.navigate(['/tasks']);
        }
        else{
           this._router.navigate(['/profile']);
        }
      },
      // err=>console.log(err);
      err=>{
        //handle server side errors
        if(err instanceof HttpErrorResponse){
          const validationError = err.error;
          if(err.status === 401) {
            this.loginForm.get('password').setErrors({ serverError: validationError}); 
          }
          else if(err.status === 422){
            this.loginForm.get('email').setErrors({ serverError: validationError}); 
          }
        }

        }
        
    )
  
  }
  
  ngOnInit(): void {
  }

}
