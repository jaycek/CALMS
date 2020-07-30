import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router:Router,public _auth:AuthService) { }

  ngOnInit(): void {

    console.log(this._auth.isAdmin());
  }

  logoutUser(){
      localStorage.removeItem('CALMSuserID');
      localStorage.removeItem('CALMSemail');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    this._router.navigate(['/login']);
  }

}
