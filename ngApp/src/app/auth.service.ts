import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/register";
  private _loginUrl = "http://localhost:3000/login";
  private _getUserUrl ="http://localhost:3000/getUserDetails";
  private _updateUserUrl = "http://localhost:3000/updateUser";
  private _getUsersUrl="http://localhost:3000/getUsers";
  private _deleteUserUrl="http://localhost:3000/deleteUser";

  constructor(private http: HttpClient) { }

  registerUser(user){
    // console.log(user);
    return this.http.post(this._registerUrl,user);
  }

  loginUser(user){
    return this.http.post(this._loginUrl,user);
  }

  getLoggedInUseremail(){
    return localStorage.getItem('CALMSemail');
  }
  
  getLoggedInUserID(){
    return localStorage.getItem('CALMSuserID')
  }
  getUserDetails(id){
    return this.http.post(this._getUserUrl,{"_id":id});
  }

  getUsers(){
    return this.http.get(this._getUsersUrl);
  }

  saveUser(user){
    return this.http.post(this._updateUserUrl,user);
  }

  deleteUser(id){
    return this.http.post(this._deleteUserUrl,{"userID":id});
  }

  loggedIn(){
    return !!localStorage.getItem('token');

  }
  getToken(){
    return localStorage.getItem('token');
  }

  isAdmin(){
    return !!localStorage.getItem('isAdmin');
  }
}