import { Component, OnInit } from '@angular/core';
import {AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmedValidator} from './confirmedvalidator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
   registeredUser = {email:"", password:"",confpassword:"",name:"",address:"",contact:undefined};
   passwordpattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+.{8,}$'

  constructor(private _auth:AuthService,private _router:Router,private fb:FormBuilder) { }

  // phonePattern = /^[0-9]{10,12}$/;
  registerForm = this.fb.group(

    { email :['',[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),Validators.required]],
    // password:['',[Validators.minLength(6),Validators.required]],
    password:['',[Validators.required,Validators.pattern(this.passwordpattern)]],
    confpassword:['',[Validators.required]],
    address:['',[Validators.required]],
    name:['',[Validators.required]],
    
    contact:['',[ Validators.minLength(10),  
      Validators.maxLength(12),  
      Validators.pattern('^[0-9]*$')]]
    },
    { 
      validator: ConfirmedValidator('password', 'confpassword')
    } 
  )

  registerUser(){
    this._auth.registerUser(this.registeredUser)
    .subscribe(
      res=>{
        localStorage.setItem('token',res['token']);    
        this._router.navigate(['/login']);
      },
      err=>{
        console.log(err);
        //handle server side errors
        if(err instanceof HttpErrorResponse){
          const validationError = err.error;
           if(err.status === 422){
            this.registerForm.get('email').setErrors({ serverError: validationError}); 
          }
        }


      }
    )
  
  }


  ngOnInit(): void {
  }

}
